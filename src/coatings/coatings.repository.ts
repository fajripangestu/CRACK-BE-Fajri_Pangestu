import { Injectable } from "@nestjs/common";

@Injectable()
export class CoatingsRepository{
    getAllCoatings(){
        return 'This is coatings from repository';
    }

    getOneCoatingById(id: number){
        return `This is coating ${id} from repository`;
    }
}