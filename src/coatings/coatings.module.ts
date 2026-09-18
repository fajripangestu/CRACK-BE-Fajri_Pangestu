import { Module } from '@nestjs/common';
import { CoatingsService } from './coatings.service';
import { CoatingsController } from './coatings.controller';
import { CoatingsRepository } from './coatings.repository';

@Module({
  controllers: [CoatingsController],
  providers: [CoatingsService, CoatingsRepository],
})
export class CoatingsModule {}
