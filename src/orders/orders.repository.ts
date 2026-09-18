import { Injectable } from "@nestjs/common";

@Injectable()
export class OrdersRepository{
    getAllOrders(){
        return 'This is orders from repository';
    }

    getOneOrderById(id: number){
        return `This is order ${id} from repository`;
    }
}