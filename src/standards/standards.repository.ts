import { Injectable } from "@nestjs/common";

@Injectable()
export class StandardsRepository{

    getAllStandards(){
        return 'This is standards from reposiroty'
    }

    getOneStandardById(id: number){
        return `This is standard ${id} from repository`;
    }
}