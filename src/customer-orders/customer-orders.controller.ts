import {
  Body,
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApprovalStatus, Department } from 'generated/prisma/client';
import { Departments } from '../auth/departments.decorator';
import { DepartmentsGuard } from '../auth/departments.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CustomerOrdersService } from './customer-orders.service';
import { CreateCustomerOrderDto } from './dto/create-customer-order.dto';
import { UpdateOrderApprovalDto } from './dto/update-order-approval.dto';

@Controller('customer-orders')
@UseGuards(JwtAuthGuard)
export class CustomerOrdersController {
  constructor(private readonly customerOrdersService: CustomerOrdersService) {}

  @Get('sales')
  @UseGuards(RolesGuard, DepartmentsGuard)
  @Roles('ADMIN')
  @Departments(Department.SALES)
  findAllForSales() {
    return this.customerOrdersService.findAllForSales();
  }

  @Get('qa')
  @UseGuards(RolesGuard, DepartmentsGuard)
  @Roles('ADMIN')
  @Departments(Department.QA)
  findAllForQa(@Req() req: { user: { userId: string } }) {
    return this.customerOrdersService.findAllForQa(req.user.userId);
  }

  @Patch(':id/qa-approval')
  @UseGuards(RolesGuard, DepartmentsGuard)
  @Roles('ADMIN')
  @Departments(Department.QA)
  updateQaApproval(
    @Param('id') id: string,
    @Req() req: { user: { userId: string } },
    @Body() dto: UpdateOrderApprovalDto,
  ) {
    if (
      dto.status !== ApprovalStatus.APPROVED &&
      dto.status !== ApprovalStatus.REJECTED
    ) {
      throw new BadRequestException(
        'Status persetujuan harus APPROVED atau REJECTED.',
      );
    }

    return this.customerOrdersService.updateQaApproval(
      req.user.userId,
      id,
      dto,
    );
  }

  @Get('production')
  @UseGuards(RolesGuard, DepartmentsGuard)
  @Roles('ADMIN')
  @Departments(Department.PRODUCTION)
  findAllForProduction(@Req() req: { user: { userId: string } }) {
    return this.customerOrdersService.findAllForProduction(req.user.userId);
  }

  @Patch(':id/production-approval')
  @UseGuards(RolesGuard, DepartmentsGuard)
  @Roles('ADMIN')
  @Departments(Department.PRODUCTION)
  updateProductionApproval(
    @Param('id') id: string,
    @Req() req: { user: { userId: string } },
    @Body() dto: UpdateOrderApprovalDto,
  ) {
    if (
      dto.status !== ApprovalStatus.APPROVED &&
      dto.status !== ApprovalStatus.REJECTED
    ) {
      throw new BadRequestException(
        'Status persetujuan harus APPROVED atau REJECTED.',
      );
    }
  }
  
    @Get('ppc')
    @UseGuards(RolesGuard, DepartmentsGuard)
    @Roles('ADMIN')
    @Departments(Department.PPC)
    findAllForPpc(@Req() req: { user: { userId: string } }) {
      return this.customerOrdersService.findAllForPpc(req.user.userId);
    }

    @Patch(':id/ppc-approval')
    @UseGuards(RolesGuard, DepartmentsGuard)
    @Roles('ADMIN')
    @Departments(Department.PPC)
    updatePpcApproval(
      @Param('id') id: string,
      @Req() req: { user: { userId: string } },
      @Body() dto: UpdateOrderApprovalDto,
    ) {
      if (
        dto.status !== ApprovalStatus.APPROVED &&
        dto.status !== ApprovalStatus.REJECTED
      ) {
        throw new BadRequestException(
          'Status persetujuan harus APPROVED atau REJECTED.',
        );
      }

    return this.customerOrdersService.updatePpcApproval(
      req.user.userId,
      id,
      dto,
    );
  }

  @Get('procurement')
  @UseGuards(RolesGuard, DepartmentsGuard)
  @Roles('ADMIN')
  @Departments(Department.PROCUREMENT)
  findAllForProcurement(@Req() req: { user: { userId: string } }) {
    return this.customerOrdersService.findAllForProcurement(req.user.userId);
  }

  @Patch(':id/procurement-approval')
  @UseGuards(RolesGuard, DepartmentsGuard)
  @Roles('ADMIN')
  @Departments(Department.PROCUREMENT)
  updateProcurementApproval(
    @Param('id') id: string,
    @Req() req: { user: { userId: string } },
    @Body() dto: UpdateOrderApprovalDto,
  ) {
    if (
      dto.status !== ApprovalStatus.APPROVED &&
      dto.status !== ApprovalStatus.REJECTED
    ) {
      throw new BadRequestException(
        'Status persetujuan harus APPROVED atau REJECTED.',
      );
    }

    return this.customerOrdersService.updateProcurementApproval(
      req.user.userId,
      id,
      dto,
    );
  }

  @Get('mine')
  findAllForUser(@Req() req: { user: { userId: string } }) {
    return this.customerOrdersService.findAllForUser(req.user.userId);
  }

  @Patch(':id/cancel')
  async cancelForUser(
    @Param('id') id: string,
    @Req() req: { user: { userId: string } },
  ) {
    const updated = await this.customerOrdersService.cancelForUser(
      req.user.userId,
      id,
    );
    if (!updated) {
      throw new NotFoundException('Penawaran tidak ditemukan.');
    }
    return updated;
  }

  @Patch(':id')
  async updateForUser(
    @Param('id') id: string,
    @Req() req: { user: { userId: string } },
    @Body() updateCustomerOrderDto: CreateCustomerOrderDto,
  ) {
    const updated = await this.customerOrdersService.updateForUser(
      req.user.userId,
      id,
      updateCustomerOrderDto,
    );
    if (!updated) {
      throw new NotFoundException('Penawaran tidak ditemukan.');
    }
    return updated;
  }

  @Post('sales')
  @UseGuards(RolesGuard, DepartmentsGuard)
  @Roles('ADMIN')
  @Departments(Department.SALES)
  createForSales(@Body() createCustomerOrderDto: CreateCustomerOrderDto) {
    return this.customerOrdersService.createSalesCustomerOrder(
      createCustomerOrderDto,
    );
  }

  @Post()
  create(
    @Req() req: { user: { userId: string } },
    @Body() createCustomerOrderDto: CreateCustomerOrderDto,
  ) {
    return this.customerOrdersService.createCustomerOrder(
      req.user.userId,
      createCustomerOrderDto,
    );
  }
}
