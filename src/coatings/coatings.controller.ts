import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CoatingsService } from './coatings.service';
import { CreateCoatingDto } from './dto/create-coating.dto';
import { UpdateCoatingDto } from './dto/update-coating.dto';

@Controller('coatings')
export class CoatingsController {
  constructor(private readonly coatingsService: CoatingsService) {}

  @Post()
  create(@Body() createCoatingDto: CreateCoatingDto) {
    return this.coatingsService.create(createCoatingDto);
  }

  @Get()
  getAllCoatings(){
    return this.coatingsService.getAllCoatings();
  }

  @Get(':id')
  getOneCoatingById(@Param('id', ParseIntPipe) id: number){
    return this.coatingsService.getOneCoatingById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoatingDto: UpdateCoatingDto) {
    return this.coatingsService.update(+id, updateCoatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coatingsService.remove(+id);
  }
}
