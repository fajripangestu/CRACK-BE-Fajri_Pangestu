import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProcurementsService } from './procurements.service';
import { CreateProcurementDto } from './dto/create-procurement.dto';
import { UpdateProcurementDto } from './dto/update-procurement.dto';

@Controller('procurements')
export class ProcurementsController {
  constructor(private readonly procurementsService: ProcurementsService) {}

  @Post()
  create(@Body() createProcurementDto: CreateProcurementDto) {
    return this.procurementsService.create(createProcurementDto);
  }

  @Get()
  getAllProcurements(){
    return this.procurementsService.getAllProcurements();
  }

  @Get(':id')
  getOneProcurementById(@Param('id', ParseIntPipe) id: number){
    return this.procurementsService.getOneProcurementById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcurementDto: UpdateProcurementDto) {
    return this.procurementsService.update(+id, updateProcurementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procurementsService.remove(+id);
  }
}
