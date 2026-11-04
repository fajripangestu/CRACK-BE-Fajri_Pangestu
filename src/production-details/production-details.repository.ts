import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductionDetailsRepository {
  getAllProductionDetails() {
    return 'This is production details from repository';
  }

  getOneProductionDetailById(id: string) {
    return `This is production detail ${id} from repository`;
  }
}
