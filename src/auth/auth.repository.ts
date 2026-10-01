import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  // Cari user berdasarkan email
  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Buat user baru
  async createUser(name: string, email: string, password: string) {
    return this.prisma.user.create({
      data: { name, email, password },
    });
  }

  // Opsional: update password
  async updatePassword(userId: number, newHash: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newHash },
    });
  }

  // Opsional: hapus user
  async deleteUser(userId: number) {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
