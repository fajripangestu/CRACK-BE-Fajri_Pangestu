import { Test, TestingModule } from '@nestjs/testing';
import { MaterialLocationsController } from './material-locations.controller';
import { MaterialLocationsService } from './material-locations.service';

describe('MaterialLocationsController', () => {
  let controller: MaterialLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialLocationsController],
      providers: [MaterialLocationsService],
    }).compile();

    controller = module.get<MaterialLocationsController>(MaterialLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
