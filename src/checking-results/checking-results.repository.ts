import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckingResultsRepository {
  getAllCheckingResults() {
    return 'This is checking results from repository';
  }

  getOneCheckingResultById(id: string) {
    return `This is checking result ${id} from repository`;
  }
}
