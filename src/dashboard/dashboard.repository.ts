import { BadRequestException, Injectable } from "@nestjs/common";
import { Role } from "generated/prisma/enums";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DashboardRepository{
    constructor(private readonly prisma: PrismaService){}

    getAllUsers(){
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
}