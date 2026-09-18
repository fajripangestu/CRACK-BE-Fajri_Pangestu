import { Injectable } from '@nestjs/common';
import { CreateProductionPlanDto } from './dto/create-production-plan.dto';
import { UpdateProductionPlanDto } from './dto/update-production-plan.dto';
import { ProductionPlansRepository } from './production-plans.repository';

@Injectable()
export class ProductionPlansService {
  constructor(private readonly productionPlansRepository: ProductionPlansRepository){}
  
  create(createProductionPlanDto: CreateProductionPlanDto) {
    return 'This action adds a new productionPlan';
  }

  getAllProductionPlans(){
    return this.productionPlansRepository.getAllProductionPlans();
  }

  getOneProductionPlanById(id: number){
    return this.productionPlansRepository.getOneProductionPlanById(id);
  }

  update(id: number, updateProductionPlanDto: UpdateProductionPlanDto) {
    return `This action updates a #${id} productionPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionPlan`;
  }
}
