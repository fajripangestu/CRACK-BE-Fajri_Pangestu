import { Injectable } from "@nestjs/common";
import { Role } from "generated/prisma/enums";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersRepository{
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

    async getOneUserById(id: number){
        return this.prisma.user.findUnique(
            {
                where: {id: id},
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }
        );
    }
    
    async updateRole(id: number, role: string) {
        const validRoles = Object.values(Role); // ['USER','ADMIN','SUPERADMIN']
        if (!validRoles.includes(role as Role)) {
            throw new Error(`Invalid role: ${role}`);
        }

        return await this.prisma.user.update({
            where: { id },
            data: { role: role as Role },
        });
    }
}