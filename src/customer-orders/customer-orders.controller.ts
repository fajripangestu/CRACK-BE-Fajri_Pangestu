import { Controller } from '@nestjs/common';
import { CustomerOrdersService } from './customer-orders.service';

@Controller('customer-orders')
export class CustomerOrdersController {
  constructor(private readonly customerOrdersService: CustomerOrdersService) {}
}
