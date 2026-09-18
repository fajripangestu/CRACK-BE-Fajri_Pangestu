import { Module } from '@nestjs/common';
import { ProductionPlansService } from './production-plans.service';
import { ProductionPlansController } from './production-plans.controller';
import { ProductionPlansRepository } from './production-plans.repository';

@Module({
  controllers: [ProductionPlansController],
  providers: [ProductionPlansService, ProductionPlansRepository],
})
export class ProductionPlansModule {}
