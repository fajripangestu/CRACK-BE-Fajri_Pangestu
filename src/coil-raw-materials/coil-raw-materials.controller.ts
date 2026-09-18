import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CoilRawMaterialsService } from './coil-raw-materials.service';
import { CreateCoilRawMaterialDto } from './dto/create-coil-raw-material.dto';
import { UpdateCoilRawMaterialDto } from './dto/update-coil-raw-material.dto';

@Controller('coil-raw-materials')
export class CoilRawMaterialsController {
  constructor(private readonly coilRawMaterialsService: CoilRawMaterialsService) {}

  @Post()
  create(@Body() createCoilRawMaterialDto: CreateCoilRawMaterialDto) {
    return this.coilRawMaterialsService.create(createCoilRawMaterialDto);
  }

  @Get()
  getAllCoilRawMaterial(){
    return this.coilRawMaterialsService.getAllCoilRawMaterials();
  }

  @Get(':id')
  getOneCoilRawMaterialById(@Param('id', ParseIntPipe) id: number){
    return this.coilRawMaterialsService.getOneCoilRawMaterialById(id);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoilRawMaterialDto: UpdateCoilRawMaterialDto) {
    return this.coilRawMaterialsService.update(+id, updateCoilRawMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coilRawMaterialsService.remove(+id);
  }
}
