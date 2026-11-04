import { Injectable } from '@nestjs/common';
import { CreateProcurementDto } from './dto/create-procurement.dto';
import { UpdateProcurementDto } from './dto/update-procurement.dto';
import { ProcurementsRepository } from './procurements.repository';

@Injectable()
export class ProcurementsService {
  constructor(
    private readonly procurementsRepository: ProcurementsRepository,
  ) {}

  create(createProcurementDto: CreateProcurementDto) {
    return 'This action adds a new procurement';
  }

  getAllProcurements() {
    return this.procurementsRepository.getAllProcurements();
  }

  getOneProcurementById(id: string) {
    return this.procurementsRepository.getOneProcurementById(id);
  }

  update(id: string, updateProcurementDto: UpdateProcurementDto) {
    return `This action updates a #${id} procurement`;
  }

  remove(id: string) {
    return `This action removes a #${id} procurement`;
  }
}
