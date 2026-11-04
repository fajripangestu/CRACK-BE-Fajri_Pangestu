import { Injectable } from '@nestjs/common';

@Injectable()
export class StandardsRepository {
  getAllStandards() {
    return 'This is standards from repository';
  }

  getOneStandardById(id: string) {
    return `This is standard ${id} from repository`;
  }
}
