import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserHistoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.userHistory.findMany({
      include: {
        modifier: { select: { name: true } },
        user: { select: { name: true } },
      },
      orderBy: { changedAt: 'desc' },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.userHistory.findMany({
      where: { userId },
      include: {
        modifier: { select: { name: true } },
        user: { select: { name: true } },
      },
      orderBy: { changedAt: 'desc' },
    });
  }

  async createHistory(data: {
    userId: string;
    field: string;
    oldValue?: string | null;
    newValue?: string | null;
    changedBy: string;
  }) {
    return this.prisma.userHistory.create({ data });
  }
}
