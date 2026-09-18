import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { LabResultsService } from './lab-results.service';
import { CreateLabResultDto } from './dto/create-lab-result.dto';
import { UpdateLabResultDto } from './dto/update-lab-result.dto';

@Controller('lab-results')
export class LabResultsController {
  constructor(private readonly labResultsService: LabResultsService) {}

  @Post()
  create(@Body() createLabResultDto: CreateLabResultDto) {
    return this.labResultsService.create(createLabResultDto);
  }

  @Get()
  getAllLabResults(){
    return this.labResultsService.getAllLabResults();
  }

  @Get(':id')
  getOneLabResultById(@Param('id', ParseIntPipe) id: number){
    return this.labResultsService.getOneLabResultById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLabResultDto: UpdateLabResultDto) {
    return this.labResultsService.update(+id, updateLabResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labResultsService.remove(+id);
  }
}
