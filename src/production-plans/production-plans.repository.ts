import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductionPlansRepository{
    getAllProductionPlans(){
        return 'This is production plans from repository';
    }

    getOneProductionPlanById(id: number){
        return `This is production plan ${id} from repository`;
    }
}