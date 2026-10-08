import { BadRequestException, Injectable } from "@nestjs/common";
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
            throw new BadRequestException(`Invalid role: ${role}`);
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

    async updateRole(id: number, role: string, modifierId: number) {
  const validRoles = Object.values(Role); // ['USER','ADMIN','SUPERADMIN']
  if (!validRoles.includes(role as Role)) {
    throw new BadRequestException(`Invalid role: ${role}`);
  }

  // ambil user lama untuk tahu oldValue
  const user = await this.prisma.user.findUnique({ where: { id } });

  // update role user
  const updatedUser = await this.prisma.user.update({
    where: { id },
    data: { role: role as Role },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      updatedAt: true,
    },
  });

  // simpan log ke UserHistory
  await this.prisma.userHistory.create({
    data: {
      userId: id,
      field: "role",
      oldValue: user?.role,
      newValue: role,
      changedBy: modifierId,
    },
  });

  return updatedUser;
}

}