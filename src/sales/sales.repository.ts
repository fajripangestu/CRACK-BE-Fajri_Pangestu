import { Injectable } from '@nestjs/common';

@Injectable()
export class SalesRepository {
  getAllSales() {
    return 'This is sales from repository';
  }

  getOneSaleById(id: string) {
    return `This is sale ${id} from repository`;
  }
}
