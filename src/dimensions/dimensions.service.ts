import { Injectable } from '@nestjs/common';
import { CreateDimensionDto } from './dto/create-dimension.dto';
import { UpdateDimensionDto } from './dto/update-dimension.dto';
import { DimensionsRepository } from './dimensions.repository';

@Injectable()
export class DimensionsService {
  constructor(private readonly dimensionsRepository: DimensionsRepository){}

  create(createDimensionDto: CreateDimensionDto) {
    return 'This action adds a new dimension';
  }

  getAllDimensions(){
    return this.dimensionsRepository.getAllDimensions();
  }

  getOneDimensionById(id: number){
    return this.dimensionsRepository.getOneDimensionById(id);
  }

  update(id: number, updateDimensionDto: UpdateDimensionDto) {
    return `This action updates a #${id} dimension`;
  }

  remove(id: number) {
    return `This action removes a #${id} dimension`;
  }
}
