import { Test, TestingModule } from '@nestjs/testing';
import { CheckingResultsService } from './checking-results.service';

describe('CheckingResultsService', () => {
  let service: CheckingResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckingResultsService],
    }).compile();

    service = module.get<CheckingResultsService>(CheckingResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
