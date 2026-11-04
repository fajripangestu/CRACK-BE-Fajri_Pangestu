// user-history.service.ts
import { Injectable } from '@nestjs/common';
import { UserHistoryRepository } from './user-history.repository';

@Injectable()
export class UserHistoryService {
  constructor(private userHistoryRepository: UserHistoryRepository) {}

  async findAll() {
    return this.userHistoryRepository.findAll();
  }

  async findByUser(userId: string) {
    return this.userHistoryRepository.findByUser(userId);
  }

  async logChange(
    userId: string,
    field: string,
    oldValue: string | null,
    newValue: string | null,
    changedBy: string,
  ) {
    return this.userHistoryRepository.createHistory({
      userId,
      field,
      oldValue: oldValue ?? undefined,
      newValue: newValue ?? undefined,
      changedBy,
    });
  }
}
