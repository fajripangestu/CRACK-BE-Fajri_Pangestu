import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  getAllOrders() {
    return this.ordersRepository.getAllOrders();
  }

  getOneOrderById(id: string) {
    return this.ordersRepository.getOneOrderById(id);
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
