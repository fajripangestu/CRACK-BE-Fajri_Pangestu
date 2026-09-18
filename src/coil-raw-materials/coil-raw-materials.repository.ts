import { Injectable } from "@nestjs/common";

@Injectable()
export class CoilRawMaterialsRepository{
    getAllCoilRawMaterials(){
        return 'This is coil raw materials from repository';
    }

    getOneCoilRawMaterialById(id: number){
        return `This is coil raw material ${id} from repository`;
    }
}