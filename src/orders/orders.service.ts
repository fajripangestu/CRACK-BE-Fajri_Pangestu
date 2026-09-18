import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository){}

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  getAllOrders(){
    return this.ordersRepository.getAllOrders();
  }

  getOneOrderById(id: number){
    return this.ordersRepository.getOneOrderById(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
