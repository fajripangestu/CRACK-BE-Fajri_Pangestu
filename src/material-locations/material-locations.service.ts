import { Injectable } from '@nestjs/common';
import { CreateMaterialLocationDto } from './dto/create-material-location.dto';
import { UpdateMaterialLocationDto } from './dto/update-material-location.dto';
import { MaterialLocationsRepository } from './material-locations.repository';

@Injectable()
export class MaterialLocationsService {
  constructor(private readonly materialLocationsRepository: MaterialLocationsRepository){}

  create(createMaterialLocationDto: CreateMaterialLocationDto) {
    return 'This action adds a new materialLocation';
  }

  getAllMaterialLocations(){
    return this.materialLocationsRepository.getAllMaterialLocations();
  }

  getOneMaterialLocationById(id: number){
    return this.materialLocationsRepository.getOneMaterialLocationById(id);
  }

  update(id: number, updateMaterialLocationDto: UpdateMaterialLocationDto) {
    return `This action updates a #${id} materialLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} materialLocation`;
  }
}
