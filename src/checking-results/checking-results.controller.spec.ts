import { Test, TestingModule } from '@nestjs/testing';
import { CheckingResultsController } from './checking-results.controller';
import { CheckingResultsService } from './checking-results.service';

describe('CheckingResultsController', () => {
  let controller: CheckingResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckingResultsController],
      providers: [CheckingResultsService],
    }).compile();

    controller = module.get<CheckingResultsController>(CheckingResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
