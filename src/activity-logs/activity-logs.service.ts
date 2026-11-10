import { Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { ActivityLogsRepository } from './activity-logs.repository';

@Injectable()
export class ActivityLogsService {
  constructor(
    private readonly activityLogsRepository: ActivityLogsRepository,
  ) {}

  logLoginAttempt(userId: string | null, succeeded: boolean, request: Request) {
    return this.activityLogsRepository.logLoginAttempt(
      userId,
      succeeded,
      request,
    );
  }

  logLogout(userId: string, request: Request) {
    return this.activityLogsRepository.logLogout(userId, request);
  }

  findAll() {
    return this.activityLogsRepository.findAll();
  }
}
