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
  getAllProcurements() {
    return this.procurementsService.getAllProcurements();
  }

  @Get(':id')
  getOneProcurementById(@Param('id', ParseUUIDPipe) id: string) {
    return this.procurementsService.getOneProcurementById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProcurementDto: UpdateProcurementDto,
  ) {
    return this.procurementsService.update(id, updateProcurementDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.procurementsService.remove(id);
  }
}
