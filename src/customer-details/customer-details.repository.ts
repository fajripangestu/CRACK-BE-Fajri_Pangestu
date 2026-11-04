import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDetailDto } from './dto/create-customer-detail.dto';

@Injectable()
export class CustomerDetailsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findActiveByUserId(userId: string) {
    return this.prisma.customerDetail.findMany({
      where: { userId, isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findAllActiveForSales() {
    return this.prisma.customerDetail.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        companyName: true,
        companyAddress: true,
        contactPerson: true,
        email: true,
        phone: true,
        createdAt: true,
        user: { select: { name: true, email: true } },
        _count: { select: { customer_orders: true } },
      },
    });
  }

  createForUser(userId: string, data: CreateCustomerDetailDto) {
    return this.prisma.customerDetail.create({
      data: {
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        contactPerson: data.contactPerson,
        email: data.email || null,
        phone: data.phone || null,
        userId,
      },
    });
  }
}
