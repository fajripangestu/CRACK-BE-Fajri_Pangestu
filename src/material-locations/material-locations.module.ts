import { Module } from '@nestjs/common';
import { MaterialLocationsService } from './material-locations.service';
import { MaterialLocationsController } from './material-locations.controller';
import { MaterialLocationsRepository } from './material-locations.repository';

@Module({
  controllers: [MaterialLocationsController],
  providers: [MaterialLocationsService, MaterialLocationsRepository],
})
export class MaterialLocationsModule {}
