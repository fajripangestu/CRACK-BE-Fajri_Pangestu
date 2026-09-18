import { Test, TestingModule } from '@nestjs/testing';
import { ProductionDetailsService } from './production-details.service';

describe('ProductionDetailsService', () => {
  let service: ProductionDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionDetailsService],
    }).compile();

    service = module.get<ProductionDetailsService>(ProductionDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
