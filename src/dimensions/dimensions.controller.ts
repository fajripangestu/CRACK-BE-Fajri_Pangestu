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
  getAllDimensions() {
    return this.dimensionsService.getAllDimensions();
  }

  @Get(':id')
  getOneDimensionById(@Param('id', ParseUUIDPipe) id: string) {
    return this.dimensionsService.getOneDimensionById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDimensionDto: UpdateDimensionDto,
  ) {
    return this.dimensionsService.update(id, updateDimensionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.dimensionsService.remove(id);
  }
}
