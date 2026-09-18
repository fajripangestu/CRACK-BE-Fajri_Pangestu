import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { StandardsService } from './standards.service';
import { CreateStandardDto } from './dto/create-standard.dto';
import { UpdateStandardDto } from './dto/update-standard.dto';

@Controller('standards')
export class StandardsController {
  constructor(private readonly standardsService: StandardsService) {}

  @Get()
  getAllStandards(){
    return this.standardsService.getAllStandards();
  }
  @Post()
  create(@Body() createStandardDto: CreateStandardDto) {
    return this.standardsService.create(createStandardDto);
  }

  @Get(':id')
  getOneStandardById(@Param('id', ParseIntPipe) id: number){
    return this.standardsService.getOneStandardById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStandardDto: UpdateStandardDto) {
    return this.standardsService.update(+id, updateStandardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.standardsService.remove(+id);
  }
}
