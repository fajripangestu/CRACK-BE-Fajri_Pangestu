import { Module } from '@nestjs/common';
import { CoilRawMaterialsService } from './coil-raw-materials.service';
import { CoilRawMaterialsController } from './coil-raw-materials.controller';
import { CoilRawMaterialsRepository } from './coil-raw-materials.repository';

@Module({
  controllers: [CoilRawMaterialsController],
  providers: [CoilRawMaterialsService, CoilRawMaterialsRepository],
})
export class CoilRawMaterialsModule {}
