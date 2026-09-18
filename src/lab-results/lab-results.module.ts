import { Module } from '@nestjs/common';
import { LabResultsService } from './lab-results.service';
import { LabResultsController } from './lab-results.controller';
import { LabResultsRepository } from './lab-results.repository';

@Module({
  controllers: [LabResultsController],
  providers: [LabResultsService, LabResultsRepository],
})
export class LabResultsModule {}
