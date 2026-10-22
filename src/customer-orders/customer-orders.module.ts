import { Module } from '@nestjs/common';
import { CustomerOrdersService } from './customer-orders.service';
import { CustomerOrdersController } from './customer-orders.controller';

@Module({
  controllers: [CustomerOrdersController],
  providers: [CustomerOrdersService],
})
export class CustomerOrdersModule {}
