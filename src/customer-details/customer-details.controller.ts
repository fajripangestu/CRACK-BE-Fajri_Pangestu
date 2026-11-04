import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Department } from 'generated/prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Departments } from '../auth/departments.decorator';
import { DepartmentsGuard } from '../auth/departments.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateCustomerDetailDto } from './dto/create-customer-detail.dto';
import { CustomerDetailsService } from './customer-details.service';

@Controller('customer-details')
@UseGuards(JwtAuthGuard)
export class CustomerDetailsController {
  constructor(
    private readonly customerDetailsService: CustomerDetailsService,
  ) {}

  @Get()
  findMine(@Req() req: { user: { userId: string } }) {
    return this.customerDetailsService.findActiveByUserId(req.user.userId);
  }

  @Get('sales')
  @UseGuards(RolesGuard, DepartmentsGuard)
  @Roles('ADMIN')
  @Departments(Department.SALES)
  findAllForSales() {
    return this.customerDetailsService.findAllActiveForSales();
  }

  @Post('sales')
  @UseGuards(RolesGuard, DepartmentsGuard)
  @Roles('ADMIN')
  @Departments(Department.SALES)
  createForSales(
    @Req() req: { user: { userId: string } },
    @Body() data: CreateCustomerDetailDto,
  ) {
    return this.customerDetailsService.createForUser(req.user.userId, data);
  }

  @Post()
  create(
    @Req() req: { user: { userId: string } },
    @Body() createCustomerDetailDto: CreateCustomerDetailDto,
  ) {
    return this.customerDetailsService.createForUser(
      req.user.userId,
      createCustomerDetailDto,
    );
  }
}
