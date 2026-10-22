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

  async updateUser(userId: number, dto: UpdateUserDto, modifierId: number) {
  // Pengecekan "user ada atau tidak" sudah dilakukan di repository,
  // jadi tidak perlu query getOneUserById lagi di sini.
  const updated = await this.usersRepository.updateUser(userId, dto, modifierId);

  // Kembalikan field yang aman saja (tanpa password)
  return {
    id: updated.id,
    name: updated.name,
    email: updated.email,
    role: updated.role,
    updatedAt: updated.updatedAt,
  };
}

   // 🔹 Create user baru
  async createUser(data: { name: string; email: string; password: string }) {
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
