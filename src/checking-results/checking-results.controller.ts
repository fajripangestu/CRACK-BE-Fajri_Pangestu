import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CheckingResultsService } from './checking-results.service';
import { CreateCheckingResultDto } from './dto/create-checking-result.dto';
import { UpdateCheckingResultDto } from './dto/update-checking-result.dto';

@Controller('checking-results')
export class CheckingResultsController {
  constructor(private readonly checkingResultsService: CheckingResultsService) {}

  @Post()
  create(@Body() createCheckingResultDto: CreateCheckingResultDto) {
    return this.checkingResultsService.create(createCheckingResultDto);
  }

  @Get()
  getAllCheckingResults(){
    return this.checkingResultsService.getAllCheckingResults();
  }

  @Get(':id')
  getOneCheckingResultById(@Param('id', ParseIntPipe) id: number){
    return this.checkingResultsService.getOneCheckingResultById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckingResultDto: UpdateCheckingResultDto) {
    return this.checkingResultsService.update(+id, updateCheckingResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkingResultsService.remove(+id);
  }
}
