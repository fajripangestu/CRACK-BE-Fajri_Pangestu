import { Module } from '@nestjs/common';
import { CustomerOrdersService } from './customer-orders.service';
import { CustomerOrdersController } from './customer-orders.controller';
import { CustomerOrdersRepository } from './customer-orders.repository';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [CustomerOrdersController],
  providers: [CustomerOrdersService, CustomerOrdersRepository],
})
export class CustomerOrdersModule {}
