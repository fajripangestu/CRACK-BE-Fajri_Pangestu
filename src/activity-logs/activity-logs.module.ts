import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ActivityLogsController } from './activity-logs.controller';
import { ActivityLogsRepository } from './activity-logs.repository';
import { ActivityLogsService } from './activity-logs.service';

@Module({
  imports: [PrismaModule],
  controllers: [ActivityLogsController],
  providers: [ActivityLogsService, ActivityLogsRepository],
  exports: [ActivityLogsService],
})
export class ActivityLogsModule {}
