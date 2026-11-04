import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersRepository {
  getAllOrders() {
    return 'This is orders from repository';
  }

  getOneOrderById(id: string) {
    return `This is order ${id} from repository`;
  }
}
