import { Module } from '@nestjs/common';
import { UserHistoryService } from './user-history.service';
import { UserHistoryController } from './user-history.controller';
import { UserHistoryRepository } from './user-history.repository';

@Module({
  controllers: [UserHistoryController],
  providers: [UserHistoryService, UserHistoryRepository],
})
export class UserHistoryModule {}
