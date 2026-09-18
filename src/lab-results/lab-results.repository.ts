import { Injectable } from "@nestjs/common";

@Injectable()
export class LabResultsRepository{
    getAllLabResults(){
        return 'This is lab results from repository';
    }

    getOneLabResultById(id: number){
        return `This is lab result ${id} from repository`;
    }
}