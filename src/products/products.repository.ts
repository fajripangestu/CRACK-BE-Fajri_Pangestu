import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsRepository{
    getAllProducts(){
        return 'This is products from repository';
    }

    getOneProductById(id: number){
        return `This is product ${id} from repository`;
    }
}