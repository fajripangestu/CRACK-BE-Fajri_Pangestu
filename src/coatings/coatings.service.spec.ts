import { Test, TestingModule } from '@nestjs/testing';
import { CoatingsService } from './coatings.service';

describe('CoatingsService', () => {
  let service: CoatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoatingsService],
    }).compile();

    service = module.get<CoatingsService>(CoatingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
