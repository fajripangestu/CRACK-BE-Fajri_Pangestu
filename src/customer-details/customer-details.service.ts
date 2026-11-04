import { Injectable } from '@nestjs/common';
import { CreateCustomerDetailDto } from './dto/create-customer-detail.dto';
import { CustomerDetailsRepository } from './customer-details.repository';

@Injectable()
export class CustomerDetailsService {
  constructor(
    private readonly customerDetailsRepository: CustomerDetailsRepository,
  ) {}

  findActiveByUserId(userId: string) {
    return this.customerDetailsRepository.findActiveByUserId(userId);
  }

  findAllActiveForSales() {
    return this.customerDetailsRepository.findAllActiveForSales();
  }

  createForUser(userId: string, data: CreateCustomerDetailDto) {
    return this.customerDetailsRepository.createForUser(userId, data);
  }
}
