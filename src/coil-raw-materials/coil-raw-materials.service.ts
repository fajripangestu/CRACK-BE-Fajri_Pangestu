import { Injectable } from '@nestjs/common';
import { CreateCoilRawMaterialDto } from './dto/create-coil-raw-material.dto';
import { UpdateCoilRawMaterialDto } from './dto/update-coil-raw-material.dto';
import { CoilRawMaterialsRepository } from './coil-raw-materials.repository';

@Injectable()
export class CoilRawMaterialsService {
  constructor(private readonly coilRawMaterialsRepository: CoilRawMaterialsRepository){}

  create(createCoilRawMaterialDto: CreateCoilRawMaterialDto) {
    return 'This action adds a new coilRawMaterial';
  }

  getAllCoilRawMaterials(){
    return this.coilRawMaterialsRepository.getAllCoilRawMaterials();
  }

  getOneCoilRawMaterialById(id: number){
    return this.coilRawMaterialsRepository.getOneCoilRawMaterialById(id);
  }

  update(id: number, updateCoilRawMaterialDto: UpdateCoilRawMaterialDto) {
    return `This action updates a #${id} coilRawMaterial`;
  }

  remove(id: number) {
    return `This action removes a #${id} coilRawMaterial`;
  }
}
