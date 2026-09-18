import { Test, TestingModule } from '@nestjs/testing';
import { MaterialLocationsService } from './material-locations.service';

describe('MaterialLocationsService', () => {
  let service: MaterialLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialLocationsService],
    }).compile();

    service = module.get<MaterialLocationsService>(MaterialLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
