import { Module } from '@nestjs/common';
import { ProductionDetailsService } from './production-details.service';
import { ProductionDetailsController } from './production-details.controller';
import { ProductionDetailsRepository } from './production-details.repository';

@Module({
  controllers: [ProductionDetailsController],
  providers: [ProductionDetailsService, ProductionDetailsRepository],
})
export class ProductionDetailsModule {}
