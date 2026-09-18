import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository{
    //constructor(private readonly prisma: PrismaService){}

    getAllUsers(){
        return 'This is users from repository'
    }

    getOneUserById(id: number){
        return `This is user ${id} from repository`;
    }
}