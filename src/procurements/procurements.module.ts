import { Module } from '@nestjs/common';
import { ProcurementsService } from './procurements.service';
import { ProcurementsController } from './procurements.controller';
import { ProcurementsRepository } from './procurements.repository';

@Module({
  controllers: [ProcurementsController],
  providers: [ProcurementsService, ProcurementsRepository],
})
export class ProcurementsModule {}
