import { Injectable } from '@nestjs/common';

@Injectable()
export class CoatingsRepository {
  getAllCoatings() {
    return 'This is coatings from repository';
  }

  getOneCoatingById(id: string) {
    return `This is coating ${id} from repository`;
  }
}
