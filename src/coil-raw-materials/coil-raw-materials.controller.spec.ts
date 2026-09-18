import { Test, TestingModule } from '@nestjs/testing';
import { CoilRawMaterialsController } from './coil-raw-materials.controller';
import { CoilRawMaterialsService } from './coil-raw-materials.service';

describe('CoilRawMaterialsController', () => {
  let controller: CoilRawMaterialsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoilRawMaterialsController],
      providers: [CoilRawMaterialsService],
    }).compile();

    controller = module.get<CoilRawMaterialsController>(CoilRawMaterialsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
