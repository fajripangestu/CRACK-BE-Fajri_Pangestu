import { Injectable } from '@nestjs/common';
import { CreateProductionDetailDto } from './dto/create-production-detail.dto';
import { UpdateProductionDetailDto } from './dto/update-production-detail.dto';
import { ProductionDetailsRepository } from './production-details.repository';

@Injectable()
export class ProductionDetailsService {
  constructor(private readonly productionDetailsRepository: ProductionDetailsRepository){}
  
  create(createProductionDetailDto: CreateProductionDetailDto) {
    return 'This action adds a new productionDetail';
  }

  getAllProductionDetails(){
    return this.productionDetailsRepository.getAllProductionDetails();
  }

  getOneProductionDetailById(id: number){
    return this.productionDetailsRepository.getOneProductionDetailById(id);
  }

  update(id: number, updateProductionDetailDto: UpdateProductionDetailDto) {
    return `This action updates a #${id} productionDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionDetail`;
  }
}
