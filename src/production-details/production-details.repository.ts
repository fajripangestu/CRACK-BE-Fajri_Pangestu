import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductionDetailsRepository{
    getAllProductionDetails(){
        return 'This is production details from repository';
    }

    getOneProductionDetailById(id: number){
        return `This is production detail ${id} from repository`;
    }
}