import { Injectable } from '@nestjs/common';
import { CreateCustomerOrderDto } from './dto/create-customer-order.dto';
import { UpdateOrderApprovalDto } from './dto/update-order-approval.dto';
import { CustomerOrdersRepository } from './customer-orders.repository';

@Injectable()
export class CustomerOrdersService {
  constructor(
    private readonly customerOrderRepository: CustomerOrdersRepository,
  ) {}

  findAllForSales() {
    return this.customerOrderRepository.findAllForSales();
  }

  findAllForQa(userId: string) {
    return this.customerOrderRepository.findAllForQa(userId);
  }

  updateQaApproval(userId: string, id: string, data: UpdateOrderApprovalDto) {
    return this.customerOrderRepository.updateQaApproval(userId, id, data);
  }

  findAllForProduction(userId: string) {
    return this.customerOrderRepository.findAllForProduction(userId);
  }

  updateProductionApproval(
    userId: string,
    id: string,
    data: UpdateOrderApprovalDto,
  ) {
    return this.customerOrderRepository.updateProductionApproval(
      userId,
      id,
      data,
    );
  }

  findAllForPpc(userId: string) {
    return this.customerOrderRepository.findAllForPpc(userId);
  }

  updatePpcApproval(
    userId: string,
    id: string,
    data: UpdateOrderApprovalDto,
  ) {
    return this.customerOrderRepository.updatePpcApproval(
      userId,
      id,
      data,
    );
  }

  findAllForProcurement(userId: string) {
    return this.customerOrderRepository.findAllForProcurement(userId);
  }

  updateProcurementApproval(
    userId: string,
    id: string,
    data: UpdateOrderApprovalDto,
  ) {
    return this.customerOrderRepository.updateProcurementApproval(
      userId,
      id,
      data,
    );
  }

  findAllForUser(userId: string) {
    return this.customerOrderRepository.findAllForUser(userId);
  }

  cancelForUser(userId: string, id: string) {
    return this.customerOrderRepository.cancelForUser(userId, id);
  }

  updateForUser(userId: string, id: string, data: CreateCustomerOrderDto) {
    return this.customerOrderRepository.updateForUser(userId, id, data);
  }

  createSalesCustomerOrder(data: CreateCustomerOrderDto) {
    return this.customerOrderRepository.createSalesCustomerOrder(data);
  }

  async createCustomerOrder(userId: string, data: CreateCustomerOrderDto) {
    return this.customerOrderRepository.createCustomerOrder(userId, data);
  }
}
