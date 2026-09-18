import { Injectable } from "@nestjs/common";

@Injectable()
export class MaterialLocationsRepository{
    getAllMaterialLocations(){
        return 'This is material locations from repository';
    }

    getOneMaterialLocationById(id: number){
        return `This is material location ${id} from repository`;
    }
}