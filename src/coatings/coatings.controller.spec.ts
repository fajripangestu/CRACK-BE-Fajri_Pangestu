import { Test, TestingModule } from '@nestjs/testing';
import { CoatingsController } from './coatings.controller';
import { CoatingsService } from './coatings.service';

describe('CoatingsController', () => {
  let controller: CoatingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoatingsController],
      providers: [CoatingsService],
    }).compile();

    controller = module.get<CoatingsController>(CoatingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
