import { Injectable } from "@nestjs/common";
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

    getOneUserById(id: number){
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
    
    updateRole(id: number, role: string) {
        return this.prisma.user.update({
            where: { id },
            data: { role },
        });
    }
}