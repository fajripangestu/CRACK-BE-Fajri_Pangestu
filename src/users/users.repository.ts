import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersRepository{
    constructor(private readonly prisma: PrismaService){}

    getAllUsers(){
        return this.prisma.user.findMany();
    }

    getOneUserById(id: number){
        return this.prisma.user.findUnique(
            {
                where: {id: id}
            }
        );
    }
}