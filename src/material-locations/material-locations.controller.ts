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
import { MaterialLocationsService } from './material-locations.service';
import { CreateMaterialLocationDto } from './dto/create-material-location.dto';
import { UpdateMaterialLocationDto } from './dto/update-material-location.dto';

@Controller('material-locations')
export class MaterialLocationsController {
  constructor(
    private readonly materialLocationsService: MaterialLocationsService,
  ) {}

  @Post()
  create(@Body() createMaterialLocationDto: CreateMaterialLocationDto) {
    return this.materialLocationsService.create(createMaterialLocationDto);
  }

  @Get()
  getAllMaterialLocations() {
    return this.materialLocationsService.getAllMaterialLocations();
  }

  @Get(':id')
  getOneMaterialLocationById(@Param('id', ParseUUIDPipe) id: string) {
    return this.materialLocationsService.getOneMaterialLocationById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMaterialLocationDto: UpdateMaterialLocationDto,
  ) {
    return this.materialLocationsService.update(id, updateMaterialLocationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.materialLocationsService.remove(id);
  }
}
