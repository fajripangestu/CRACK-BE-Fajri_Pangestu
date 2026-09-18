import { Module } from '@nestjs/common';
import { CheckingResultsService } from './checking-results.service';
import { CheckingResultsController } from './checking-results.controller';
import { CheckingResultsRepository } from './checking-results.repository';

@Module({
  controllers: [CheckingResultsController],
  providers: [CheckingResultsService, CheckingResultsRepository],
})
export class CheckingResultsModule {}
