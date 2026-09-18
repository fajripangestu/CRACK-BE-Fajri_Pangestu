import { Injectable } from '@nestjs/common';
import { CreateCheckingResultDto } from './dto/create-checking-result.dto';
import { UpdateCheckingResultDto } from './dto/update-checking-result.dto';
import { CheckingResultsRepository } from './checking-results.repository';

@Injectable()
export class CheckingResultsService {
  constructor (private readonly checkingResultsRepository: CheckingResultsRepository){}

  create(createCheckingResultDto: CreateCheckingResultDto) {
    return 'This action adds a new checkingResult';
  }

  getAllCheckingResults(){
    return this.checkingResultsRepository.getAllCheckingResults();
  }

  getOneCheckingResultById(id: number){
    return this.checkingResultsRepository.getOneCheckingResultById(id);
  }

  update(id: number, updateCheckingResultDto: UpdateCheckingResultDto) {
    return `This action updates a #${id} checkingResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkingResult`;
  }
}
