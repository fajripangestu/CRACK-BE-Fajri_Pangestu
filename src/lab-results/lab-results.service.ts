import { Injectable } from '@nestjs/common';
import { CreateLabResultDto } from './dto/create-lab-result.dto';
import { UpdateLabResultDto } from './dto/update-lab-result.dto';
import { LabResultsRepository } from './lab-results.repository';

@Injectable()
export class LabResultsService {
  constructor(private readonly labResultRepository: LabResultsRepository){}

  create(createLabResultDto: CreateLabResultDto) {
    return 'This action adds a new labResult';
  }

  getAllLabResults(){
    return this.labResultRepository.getAllLabResults();
  }

  getOneLabResultById(id: number){
    return this.labResultRepository.getOneLabResultById(id);
  }

  update(id: number, updateLabResultDto: UpdateLabResultDto) {
    return `This action updates a #${id} labResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} labResult`;
  }
}
