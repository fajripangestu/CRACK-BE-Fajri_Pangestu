import { Test, TestingModule } from '@nestjs/testing';
import { ProductionDetailsController } from './production-details.controller';
import { ProductionDetailsService } from './production-details.service';

describe('ProductionDetailsController', () => {
  let controller: ProductionDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionDetailsController],
      providers: [ProductionDetailsService],
    }).compile();

    controller = module.get<ProductionDetailsController>(ProductionDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
