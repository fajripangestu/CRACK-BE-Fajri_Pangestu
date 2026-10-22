import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Role } from "generated/prisma/enums";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Prisma } from "generated/prisma/client";

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
            orderBy: {
                updatedAt: 'desc'
            }
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
    
    async updateUser(id: number, dto: UpdateUserDto, modifierId: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundException('User tidak ditemukan');

        // Hanya field yang benar-benar berubah
        const fields = ['name', 'email', 'role'] as const;
        const changed = fields.filter((f) => dto[f] !== undefined && dto[f] !== user[f]);
        console.log('DTO:', dto, '| field berubah:', changed);
        if (changed.length === 0) return user;

        try {
            const [updated] = await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id },
                data: Object.fromEntries(changed.map((f) => [f, dto[f]])),
            }),
            // Satu baris riwayat per field yang berubah
            ...changed.map((f) =>
                this.prisma.userHistory.create({
                data: {
                    userId: id,
                    field: f,
                    oldValue: String(user[f]),
                    newValue: String(dto[f]),
                    changedBy: modifierId,
                },
                }),
            ),
            ]);
            return updated;
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
            throw new ConflictException('Email sudah dipakai user lain');
            }
            throw e;
        }
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

    async logUserHistory(
        data: {
            userId: number;
            field: string;
            oldValue?: string | null;
            newValue?: string | null;
            changedBy: number;
        })
    {
        return this.prisma.userHistory.create({ data });
    }

}