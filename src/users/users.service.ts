import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository){}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  getAllUsers(){
    return this.usersRepository.getAllUsers();
  }

  getOneUserById(id: number){
    return this.usersRepository.getOneUserById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
