import { Test, TestingModule } from '@nestjs/testing';
import { ProcurementsController } from './procurements.controller';
import { ProcurementsService } from './procurements.service';

describe('ProcurementsController', () => {
  let controller: ProcurementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcurementsController],
      providers: [ProcurementsService],
    }).compile();

    controller = module.get<ProcurementsController>(ProcurementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
