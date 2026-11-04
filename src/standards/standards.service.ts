import { Injectable } from '@nestjs/common';
import { CreateStandardDto } from './dto/create-standard.dto';
import { UpdateStandardDto } from './dto/update-standard.dto';
import { StandardsRepository } from './standards.repository';

@Injectable()
export class StandardsService {
  constructor(private readonly standardsRepository: StandardsRepository) {}

  create(createStandardDto: CreateStandardDto) {
    return 'This action adds a new standard';
  }

  getAllStandards() {
    return this.standardsRepository.getAllStandards();
  }

  getOneStandardById(id: string) {
    return this.standardsRepository.getOneStandardById(id);
  }

  update(id: string, updateStandardDto: UpdateStandardDto) {
    return `This action updates a #${id} standard`;
  }

  remove(id: string) {
    return `This action removes a #${id} standard`;
  }
}
