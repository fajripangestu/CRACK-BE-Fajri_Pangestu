import { Module } from '@nestjs/common';
import { DimensionsService } from './dimensions.service';
import { DimensionsController } from './dimensions.controller';
import { DimensionsRepository } from './dimensions.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DimensionsController],
  providers: [DimensionsService, DimensionsRepository, PrismaService],
})
export class DimensionsModule {}
