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
    
    async updateRole(id: number, role: string, modifierId: number){ 
        const validRoles = Object.values(Role); // ['USER','ADMIN','SUPERADMIN']
        if (!validRoles.includes(role as Role)) {
            throw new Error(`Invalid role: ${role}`);
        }

        // ambil user lama untuk tahu oldValue
        const user = await this.prisma.user.findUnique({ where: { id } });

        // update role user
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: { role: role as Role },
        });

        // simpan log ke UserHistory
        await this.prisma.userHistory.create({
            data: {
            userId: id,
            field: "role",
            oldValue: user?.role,
            newValue: role,
            changedBy: modifierId, // siapa yang mengubah
            },
        });

        return updatedUser;
    }

    async createUser(data: { name: string; email: string; password: string }) {
        return this.prisma.user.create({
            data: {
            name: data.name,
            email: data.email,
            password: data.password,
            },
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

        // users.repository.ts
        async removeUser(id: number) {
        return this.prisma.user.delete({
            where: { id },
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

        async logUserHistory(data: {
            userId: number;
            field: string;
            oldValue?: string | null;
            newValue?: string | null;
            changedBy: number;
            }) {
            return this.prisma.userHistory.create({ data });
            }

}