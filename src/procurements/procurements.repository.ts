import { Injectable } from '@nestjs/common';

@Injectable()
export class ProcurementsRepository {
  getAllProcurements() {
    return 'This is procurements from repository';
  }

  getOneProcurementById(id: string) {
    return `This is procurement ${id} from repository`;
  }
}
