import { Injectable } from '@nestjs/common';
import { CreateCoatingDto } from './dto/create-coating.dto';
import { UpdateCoatingDto } from './dto/update-coating.dto';
import { CoatingsRepository } from './coatings.repository';

@Injectable()
export class CoatingsService {
  constructor(private readonly coatingsRepository: CoatingsRepository){}

  create(createCoatingDto: CreateCoatingDto) {
    return 'This action adds a new coating';
  }

  getAllCoatings(){
    return this.coatingsRepository.getAllCoatings();
  }

  getOneCoatingById(id: number){
    return this.coatingsRepository.getOneCoatingById(id);
  }

  update(id: number, updateCoatingDto: UpdateCoatingDto) {
    return `This action updates a #${id} coating`;
  }

  remove(id: number) {
    return `This action removes a #${id} coating`;
  }
}
