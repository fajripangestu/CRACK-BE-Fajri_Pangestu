import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAllUsers() {
    return this.usersRepository.getAllUsers();
  }

  getOneUserById(id: string) {
    return this.usersRepository.getOneUserById(id);
  }

  async updateUser(userId: string, dto: UpdateUserDto, modifierId: string) {
    // Pengecekan "user ada atau tidak" sudah dilakukan di repository,
    // jadi tidak perlu query getOneUserById lagi di sini.
    const updated = await this.usersRepository.updateUser(
      userId,
      dto,
      modifierId,
    );

    // Kembalikan field yang aman saja (tanpa password)
    return {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      department: updated.department,
      position: updated.position,
      updatedAt: updated.updatedAt,
    };
  }

  // 🔹 Create user baru
  async createUser(data: CreateUserDto, modifierId: string) {
    return this.usersRepository.createUser(data, modifierId);
  }

  async remove(id: string, modifierId: string) {
    return this.usersRepository.removeUser(id, modifierId);
  }
}
