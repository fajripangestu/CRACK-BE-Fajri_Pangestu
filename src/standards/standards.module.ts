import { Module } from '@nestjs/common';
import { StandardsService } from './standards.service';
import { StandardsController } from './standards.controller';
import { StandardsRepository } from './standards.repository';

@Module({
  controllers: [StandardsController],
  providers: [StandardsService, StandardsRepository],
})
export class StandardsModule {}
