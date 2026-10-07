import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository){}

  getAllUsers(){
    return this.usersRepository.getAllUsers();
  }

  getOneUserById(id: number){
    return this.usersRepository.getOneUserById(id);
  }

  async delegateRole(userId: number, newRole: string, modifierId: number) {
    const user = await this.usersRepository.getOneUserById(userId);
    if (!user) throw new NotFoundException('User not found');
    const updated = await this.usersRepository.updateRole(userId, newRole, modifierId);

    // return JSON yang lebih informatif
    return {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      updatedAt: updated.updatedAt,
    };
  }

   // 🔹 Create user baru
  async create(data: { name: string; email: string; password: string }) {
    return this.usersRepository.createUser(data);
  }

  async remove(id: number, modifierId: number) {
  const user = await this.usersRepository.getOneUserById(id);
  if (!user) {
    throw new Error("User not found");
  }

  // simpan log lewat repository
  await this.usersRepository.logUserHistory({
    userId: id,
    field: "user",
    oldValue: `${user.name} (${user.email})`,
    newValue: null,
    changedBy: modifierId,
  });

  return this.usersRepository.removeUser(id);
}

}
