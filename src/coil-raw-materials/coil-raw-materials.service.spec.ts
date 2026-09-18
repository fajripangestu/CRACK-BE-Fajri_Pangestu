import { Test, TestingModule } from '@nestjs/testing';
import { CoilRawMaterialsService } from './coil-raw-materials.service';

describe('CoilRawMaterialsService', () => {
  let service: CoilRawMaterialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoilRawMaterialsService],
    }).compile();

    service = module.get<CoilRawMaterialsService>(CoilRawMaterialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
