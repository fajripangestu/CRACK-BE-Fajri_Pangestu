import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApprovalStatus, Department, Prisma } from 'generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerOrderDto } from './dto/create-customer-order.dto';
import { UpdateOrderApprovalDto } from './dto/update-order-approval.dto';

const CANCELLABLE_ORDER_STATUSES = ['Pengajuan penawaran', 'Jawaban penawaran'];

async function generateQoNumber(
  tx: Prisma.TransactionClient,
  destination: string,
  orderAt: Date,
) {
  if (destination !== 'Domestik' && destination !== 'Export') {
    throw new BadRequestException('Tujuan order harus Domestik atau Export.');
  }

  const year = String(orderAt.getFullYear()).slice(-2);
  const destinationCode = destination === 'Domestik' ? 'D' : 'E';
  const prefix = `QO${destinationCode}${year}-`;
  const yearPrefix = `QO_${year}_`;

  await tx.$queryRaw`
    WITH advisory_lock AS MATERIALIZED (
      SELECT pg_advisory_xact_lock(hashtext(${yearPrefix}))
    )
    SELECT 1 AS locked FROM advisory_lock
  `;

  const existingOrders = await tx.customerOrder.findMany({
    where: {
      OR: [
        { SO: { startsWith: `QOD${year}-` } },
        { SO: { startsWith: `QOE${year}-` } },
        { SO: { startsWith: `QO${year}-` } },
        { SO: { startsWith: `SO${year}-` } },
        { SO: { startsWith: `SOD${year}-` } },
        { SO: { startsWith: `SOE${year}-` } },
      ],
    },
    select: { SO: true },
  });
  const highestSequence = existingOrders.reduce((highest, order) => {
    const match = new RegExp(`^(?:QO[DE]?|SO[DE]?)${year}-(\\d+)$`).exec(
      order.SO,
    );
    return match ? Math.max(highest, Number(match[1])) : highest;
  }, 0);

  return `${prefix}${String(highestSequence + 1).padStart(4, '0')}`;
}

@Injectable()
export class CustomerOrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAllForSales() {
    return this.prisma.customerOrder.findMany({
      orderBy: { orderAt: 'desc' },
      select: {
        id: true,
        SO: true,
        productName: true,
        productType: true,
        totalQuantity: true,
        orderStatus: true,
        orderAt: true,
        deliveryTime: true,
        user: { select: { name: true, email: true } },
        customerDetail: {
          select: {
            companyName: true,
            companyAddress: true,
            contactPerson: true,
          },
        },
        approvals: {
          orderBy: [{ department: 'asc' }, { position: 'asc' }],
          select: {
            id: true,
            department: true,
            position: true,
            status: true,
            note: true,
            decidedAt: true,
            decidedBy: { select: { name: true } },
          },
        },
      },
    });
  }

  private async getDepartmentPosition(userId: string, department: Department) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { department: true, position: true },
    });

    if (!user || user.department !== department) {
      throw new ForbiddenException(
        `Akses hanya tersedia untuk departemen ${department}.`,
      );
    }

    return user.position;
  }

  async findAllForQa(userId: string) {
    return this.findAllForDepartment(userId, Department.QA);
  }

  async findAllForProduction(userId: string) {
    return this.findAllForDepartment(userId, Department.PRODUCTION);
  }

  private async findAllForDepartment(userId: string, department: Department) {
    const position = await this.getDepartmentPosition(userId, department);
    const activeOrders = await this.prisma.customerOrder.findMany({
      where: { orderStatus: { not: 'Dibatalkan' } },
      select: { id: true },
    });

    await this.prisma.customerOrderApproval.createMany({
      data: activeOrders.map(({ id }) => ({
        customerOrderId: id,
        department,
        position,
      })),
      skipDuplicates: true,
    });

    const orders = await this.prisma.customerOrder.findMany({
      where: { orderStatus: { not: 'Dibatalkan' } },
      orderBy: { orderAt: 'desc' },
      select: {
        id: true,
        SO: true,
        productName: true,
        productType: true,
        coatingType: true,
        coatingMass: true,
        TCT: true,
        minTCT: true,
        maxTCT: true,
        BMT: true,
        minBMT: true,
        maxBMT: true,
        width: true,
        minWidth: true,
        maxWidth: true,
        Grade: true,
        YS: true,
        minYS: true,
        maxYS: true,
        TS: true,
        minTS: true,
        maxTS: true,
        EL: true,
        minEL: true,
        maxEL: true,
        chemicalTreatment: true,
        ...(department === Department.PRODUCTION
          ? { minCoilWeight: true, maxCoilWeight: true }
          : {}),
        totalQuantity: true,
        export: true,
        orderStatus: true,
        orderAt: true,
        deliveryTime: true,
        note: true,
        customerDetail: { select: { companyName: true } },
        approvals: {
          where: { department, position },
          select: {
            id: true,
            status: true,
            note: true,
            decidedAt: true,
            decidedBy: { select: { name: true } },
          },
        },
      },
    });

    return orders.map(({ approvals, ...order }) => ({
      ...order,
      approval: approvals[0] ?? null,
    }));
  }

  async updateQaApproval(
    userId: string,
    id: string,
    data: UpdateOrderApprovalDto,
  ) {
    return this.updateDepartmentApproval(userId, id, data, Department.QA);
  }

  async updateProductionApproval(
    userId: string,
    id: string,
    data: UpdateOrderApprovalDto,
  ) {
    return this.updateDepartmentApproval(
      userId,
      id,
      data,
      Department.PRODUCTION,
    );
  }

  private async updateDepartmentApproval(
    userId: string,
    id: string,
    data: UpdateOrderApprovalDto,
    department: Department,
  ) {
    const position = await this.getDepartmentPosition(userId, department);

    return this.prisma.$transaction(async (tx) => {
      const order = await tx.customerOrder.findUnique({
        where: { id },
        select: { id: true, orderStatus: true },
      });
      if (!order) {
        throw new NotFoundException('Customer order tidak ditemukan.');
      }
      if (order.orderStatus === 'Dibatalkan') {
        throw new ConflictException(
          'Persetujuan tidak dapat diubah untuk order yang dibatalkan.',
        );
      }

      const where = {
        customerOrderId_department_position: {
          customerOrderId: id,
          department,
          position,
        },
      };
      const previous = await tx.customerOrderApproval.findUnique({
        where,
        select: { id: true, status: true },
      });
      const approval = previous
        ? await tx.customerOrderApproval.update({
            where: { id: previous.id },
            data: {
              status: data.status,
              note: data.note ?? null,
              decidedById: userId,
              decidedAt: new Date(),
            },
          })
        : await tx.customerOrderApproval.create({
            data: {
              customerOrderId: id,
              department,
              position,
              status: data.status,
              note: data.note ?? null,
              decidedById: userId,
              decidedAt: new Date(),
            },
          });

      const previousStatus = previous?.status ?? ApprovalStatus.PENDING;
      if (previousStatus !== data.status) {
        await tx.customerOrderHistory.create({
          data: {
            customerOrderId: id,
            field: `approval.${department}.${position}`,
            oldValue: previousStatus,
            newValue: data.status,
            action: 'APPROVAL',
            changedById: userId,
          },
        });
      }

      return approval;
    });
  }

  findAllForUser(userId: string) {
    return this.prisma.customerOrder.findMany({
      where: { userId },
      orderBy: { orderAt: 'desc' },
      select: {
        id: true,
        SO: true,
        productName: true,
        productType: true,
        totalQuantity: true,
        orderStatus: true,
        orderAt: true,
        deliveryTime: true,
        customerDetailId: true,
        coatingType: true,
        coatingMass: true,
        TCT: true,
        minTCT: true,
        maxTCT: true,
        BMT: true,
        minBMT: true,
        maxBMT: true,
        width: true,
        minWidth: true,
        maxWidth: true,
        Grade: true,
        YS: true,
        minYS: true,
        maxYS: true,
        TS: true,
        minTS: true,
        maxTS: true,
        EL: true,
        minEL: true,
        maxEL: true,
        chemicalTreatment: true,
        minCoilWeight: true,
        maxCoilWeight: true,
        export: true,
        note: true,
        customerDetail: {
          select: {
            id: true,
            companyName: true,
            companyAddress: true,
            contactPerson: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }

  async updateForUser(
    userId: string,
    id: string,
    data: CreateCustomerOrderDto,
  ) {
    return this.prisma.$transaction(async (tx) => {
      const currentOrder = await tx.customerOrder.findFirst({
        where: { id, userId },
        select: { id: true, orderStatus: true },
      });
      if (!currentOrder) return null;
      if (!CANCELLABLE_ORDER_STATUSES.includes(currentOrder.orderStatus)) {
        throw new ConflictException(
          'Penawaran tidak dapat diedit setelah masuk tahap produksi.',
        );
      }

      if (!data.customerDetailId) {
        throw new NotFoundException('Alamat pengiriman harus dipilih.');
      }
      const customerDetail = await tx.customerDetail.findFirst({
        where: { id: data.customerDetailId, userId, isActive: true },
        select: { id: true },
      });
      if (!customerDetail) {
        throw new NotFoundException('Alamat pengiriman tidak ditemukan.');
      }

      const updated = await tx.customerOrder.updateMany({
        where: {
          id,
          userId,
          orderStatus: { in: CANCELLABLE_ORDER_STATUSES },
        },
        data: {
          customerDetailId: customerDetail.id,
          productName: [
            `${data.BMT} mm`,
            `${data.width} mm`,
            data.Grade.trim(),
            `${data.coatingMass} g/m²`,
            data.chemicalTreatment,
          ].join(' x '),
          productType: data.productType,
          coatingType: data.coatingType,
          coatingMass: data.coatingMass,
          TCT: data.TCT,
          minTCT: data.minTCT,
          maxTCT: data.maxTCT,
          BMT: data.BMT,
          minBMT: data.minBMT,
          maxBMT: data.maxBMT,
          width: data.width,
          minWidth: data.minWidth,
          maxWidth: data.maxWidth,
          Grade: data.Grade,
          YS: data.YS,
          minYS: data.minYS,
          maxYS: data.maxYS,
          TS: data.TS,
          minTS: data.minTS,
          maxTS: data.maxTS,
          EL: data.EL,
          minEL: data.minEL,
          maxEL: data.maxEL,
          chemicalTreatment: data.chemicalTreatment,
          minCoilWeight: data.minCoilWeight,
          maxCoilWeight: data.maxCoilWeight,
          totalQuantity: data.totalQuantity,
          export: data.export,
          deliveryTime: new Date(data.deliveryTime),
          note: data.note,
        },
      });
      if (updated.count === 0) {
        throw new ConflictException(
          'Penawaran tidak dapat diedit setelah masuk tahap produksi.',
        );
      }

      return tx.customerOrder.findFirst({
        where: { id, userId },
        select: {
          id: true,
          SO: true,
          productName: true,
          productType: true,
          totalQuantity: true,
          orderStatus: true,
          orderAt: true,
          deliveryTime: true,
          customerDetailId: true,
          coatingType: true,
          coatingMass: true,
          TCT: true,
          minTCT: true,
          maxTCT: true,
          BMT: true,
          minBMT: true,
          maxBMT: true,
          width: true,
          minWidth: true,
          maxWidth: true,
          Grade: true,
          YS: true,
          minYS: true,
          maxYS: true,
          TS: true,
          minTS: true,
          maxTS: true,
          EL: true,
          minEL: true,
          maxEL: true,
          chemicalTreatment: true,
          minCoilWeight: true,
          maxCoilWeight: true,
          export: true,
          note: true,
          customerDetail: {
            select: {
              id: true,
              companyName: true,
              companyAddress: true,
              contactPerson: true,
              email: true,
              phone: true,
            },
          },
        },
      });
    });
  }

  async cancelForUser(userId: string, id: string) {
    const result = await this.prisma.customerOrder.updateMany({
      where: {
        id,
        userId,
        orderStatus: { in: CANCELLABLE_ORDER_STATUSES },
      },
      data: { orderStatus: 'Dibatalkan' },
    });

    if (result.count === 0) {
      const order = await this.prisma.customerOrder.findFirst({
        where: { id, userId },
        select: { orderStatus: true },
      });
      if (!order) return null;

      throw new ConflictException(
        'Penawaran tidak dapat dibatalkan setelah masuk tahap produksi.',
      );
    }

    return this.prisma.customerOrder.findFirst({
      where: { id, userId },
      select: { id: true, orderStatus: true },
    });
  }

  async createSalesCustomerOrder(data: CreateCustomerOrderDto) {
    if (!data.customerDetailId) {
      throw new NotFoundException('Customer detail harus dipilih.');
    }

    return this.prisma.$transaction(async (tx) => {
      const customerDetail = await tx.customerDetail.findFirst({
        where: { id: data.customerDetailId, isActive: true },
        select: { id: true, userId: true },
      });
      if (!customerDetail) {
        throw new NotFoundException(
          'Customer detail tidak ditemukan atau tidak aktif.',
        );
      }

      const productName = [
        `${data.BMT} mm`,
        `${data.width} mm`,
        data.Grade.trim(),
        `${data.coatingMass} g/m²`,
        data.chemicalTreatment,
      ].join(' x ');
      const orderAt = new Date();
      const SO = await generateQoNumber(tx, data.export, orderAt);

      return tx.customerOrder.create({
        data: {
          userId: customerDetail.userId,
          SO,
          productName,
          productType: data.productType,
          coatingType: data.coatingType,
          coatingMass: data.coatingMass,
          TCT: data.TCT,
          minTCT: data.minTCT,
          maxTCT: data.maxTCT,
          BMT: data.BMT,
          minBMT: data.minBMT,
          maxBMT: data.maxBMT,
          width: data.width,
          minWidth: data.minWidth,
          maxWidth: data.maxWidth,
          Grade: data.Grade,
          YS: data.YS,
          minYS: data.minYS,
          maxYS: data.maxYS,
          TS: data.TS,
          minTS: data.minTS,
          maxTS: data.maxTS,
          EL: data.EL,
          minEL: data.minEL,
          maxEL: data.maxEL,
          chemicalTreatment: data.chemicalTreatment,
          customerDetailId: customerDetail.id,
          minCoilWeight: data.minCoilWeight,
          maxCoilWeight: data.maxCoilWeight,
          totalQuantity: data.totalQuantity,
          export: data.export,
          deliveryTime: new Date(data.deliveryTime),
          orderAt,
          orderStatus: data.orderStatus,
          note: data.note,
        },
      });
    });
  }

  async createCustomerOrder(userId: string, data: CreateCustomerOrderDto) {
    const productName = [
      `${data.BMT} mm`,
      `${data.width} mm`,
      data.Grade.trim(),
      `${data.coatingMass} g/m²`,
      data.chemicalTreatment,
    ].join(' x ');

    return this.prisma.$transaction(async (tx) => {
      const orderAt = new Date();
      const SO = await generateQoNumber(tx, data.export, orderAt);
      let customerDetailId: string;
      if (data.customerDetailId) {
        const selectedAddress = await tx.customerDetail.findFirst({
          where: { id: data.customerDetailId, userId, isActive: true },
          select: { id: true },
        });
        if (!selectedAddress) {
          throw new NotFoundException('Alamat pengiriman tidak ditemukan.');
        }
        customerDetailId = selectedAddress.id;
      } else {
        const existingCustomerDetail = await tx.customerDetail.findFirst({
          where: { userId, isActive: true },
          orderBy: { createdAt: 'asc' },
          select: { id: true },
        });

        const profileData = {
          companyName: data.companyName.trim(),
          companyAddress: data.companyAddress.trim(),
          contactPerson: data.contactPerson.trim(),
          email: data.customerEmail?.trim() || null,
          phone: data.customerPhone?.trim() || null,
        };

        const customerDetail = existingCustomerDetail
          ? await tx.customerDetail.update({
              where: { id: existingCustomerDetail.id },
              data: profileData,
              select: { id: true },
            })
          : await tx.customerDetail.create({
              data: { ...profileData, userId },
              select: { id: true },
            });
        customerDetailId = customerDetail.id;
      }

      return tx.customerOrder.create({
        data: {
          userId,
          SO,
          productName,
          productType: data.productType,
          coatingType: data.coatingType,
          coatingMass: data.coatingMass,
          TCT: data.TCT,
          minTCT: data.minTCT,
          maxTCT: data.maxTCT,
          BMT: data.BMT,
          minBMT: data.minBMT,
          maxBMT: data.maxBMT,
          width: data.width,
          minWidth: data.minWidth,
          maxWidth: data.maxWidth,
          Grade: data.Grade,
          YS: data.YS,
          minYS: data.minYS,
          maxYS: data.maxYS,
          TS: data.TS,
          minTS: data.minTS,
          maxTS: data.maxTS,
          EL: data.EL,
          minEL: data.minEL,
          maxEL: data.maxEL,
          chemicalTreatment: data.chemicalTreatment,
          customerDetailId,
          minCoilWeight: data.minCoilWeight,
          maxCoilWeight: data.maxCoilWeight,
          totalQuantity: data.totalQuantity,
          export: data.export,
          deliveryTime: new Date(data.deliveryTime),
          orderAt,
          orderStatus: data.orderStatus,
          note: data.note,
        },
      });
    });
  }
}
