import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserHistoryRepository{
    constructor(private readonly prisma: PrismaService){}

    async findAll() {
        return this.prisma.userHistory.findMany({
        include: { modifier: true },
        orderBy: { changedAt: "desc" },
        });
    }

    async findByUser(userId: number) {
        return this.prisma.userHistory.findMany({
        where: { userId },
        include: { modifier: true },
        orderBy: { changedAt: "desc" },
        });
    }

    async createHistory(data: {
        userId: number;
        field: string;
        oldValue?: string | null;
        newValue?: string | null;
        changedBy: number;
    }) {
        return this.prisma.userHistory.create({ data });
    }
}