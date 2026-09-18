import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DimensionsService } from './dimensions.service';
import { CreateDimensionDto } from './dto/create-dimension.dto';
import { UpdateDimensionDto } from './dto/update-dimension.dto';

@Controller('dimensions')
export class DimensionsController {
  constructor(private readonly dimensionsService: DimensionsService) {}

  @Post()
  create(@Body() createDimensionDto: CreateDimensionDto) {
    return this.dimensionsService.create(createDimensionDto);
  }

  @Get()
  getAllDimensions(){
    return this.dimensionsService.getAllDimensions();
  }

  @Get(':id')
  getOneDimensionById(@Param('id', ParseIntPipe) id: number){
    return this.dimensionsService.getOneDimensionById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDimensionDto: UpdateDimensionDto) {
    return this.dimensionsService.update(+id, updateDimensionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dimensionsService.remove(+id);
  }
}
