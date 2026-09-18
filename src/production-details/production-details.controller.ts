import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductionDetailsService } from './production-details.service';
import { CreateProductionDetailDto } from './dto/create-production-detail.dto';
import { UpdateProductionDetailDto } from './dto/update-production-detail.dto';

@Controller('production-details')
export class ProductionDetailsController {
  constructor(private readonly productionDetailsService: ProductionDetailsService) {}

  @Post()
  create(@Body() createProductionDetailDto: CreateProductionDetailDto) {
    return this.productionDetailsService.create(createProductionDetailDto);
  }

  @Get()
  getAllProductionDetails(){
    return this.productionDetailsService.getAllProductionDetails();
  }

  @Get(':id')
  getOneProductionDetailById(@Param('id', ParseIntPipe) id: number){
    return this.productionDetailsService.getOneProductionDetailById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductionDetailDto: UpdateProductionDetailDto) {
    return this.productionDetailsService.update(+id, updateProductionDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionDetailsService.remove(+id);
  }
}
