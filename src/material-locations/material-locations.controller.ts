import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MaterialLocationsService } from './material-locations.service';
import { CreateMaterialLocationDto } from './dto/create-material-location.dto';
import { UpdateMaterialLocationDto } from './dto/update-material-location.dto';

@Controller('material-locations')
export class MaterialLocationsController {
  constructor(private readonly materialLocationsService: MaterialLocationsService) {}

  @Post()
  create(@Body() createMaterialLocationDto: CreateMaterialLocationDto) {
    return this.materialLocationsService.create(createMaterialLocationDto);
  }

  @Get()
  getAllMaterialLocations(){
    return this.materialLocationsService.getAllMaterialLocations();
  }

  @Get(':id')
  getOneMaterialLocationById(@Param('id', ParseIntPipe) id: number){
    return this.materialLocationsService.getOneMaterialLocationById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialLocationDto: UpdateMaterialLocationDto) {
    return this.materialLocationsService.update(+id, updateMaterialLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialLocationsService.remove(+id);
  }
}
