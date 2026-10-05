import { Injectable, NotFoundException } from '@nestjs/common';
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

//   async update(id: number, updateUserDto: UpdateUserDto) {
//   const user = await this.usersRepository.getOneUserById(id);
//   if (!user) throw new NotFoundException(`User #${id} not found`);

//   return this.usersRepository.updateRole(id, updateUserDto);
// }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async delegateRole(userId: number, newRole: string) {
    const user = await this.usersRepository.getOneUserById(userId);
    if (!user) throw new NotFoundException('User not found');
  const updated = await this.usersRepository.updateRole(userId, newRole);

    // return JSON yang lebih informatif
    return {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      updatedAt: updated.updatedAt,
    };
  }
}
