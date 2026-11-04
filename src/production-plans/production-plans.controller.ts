import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductionPlansService } from './production-plans.service';
import { CreateProductionPlanDto } from './dto/create-production-plan.dto';
import { UpdateProductionPlanDto } from './dto/update-production-plan.dto';

@Controller('production-plans')
export class ProductionPlansController {
  constructor(
    private readonly productionPlansService: ProductionPlansService,
  ) {}

  @Post()
  create(@Body() createProductionPlanDto: CreateProductionPlanDto) {
    return this.productionPlansService.create(createProductionPlanDto);
  }

  @Get()
  getAllProductionPlans() {
    return this.productionPlansService.getAllProductionPlans();
  }

  @Get(':id')
  getOneProductionPlanById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productionPlansService.getOneProductionPlanById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductionPlanDto: UpdateProductionPlanDto,
  ) {
    return this.productionPlansService.update(id, updateProductionPlanDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productionPlansService.remove(id);
  }
}
