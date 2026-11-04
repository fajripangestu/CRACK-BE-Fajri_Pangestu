import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  // Cari user berdasarkan email
  // Fungsi ini digunakan untuk mencari satu user berdasarkan email yang diberikan.
  // Jika user ditemukan, data user akan dikembalikan, termasuk password hash untuk keperluan autentikasi.
  async findOneUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        password: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        department: true,
        isActive: true,
      },
    });
  }
  // Membuat user baru
  // Fungsi ini digunakan untuk membuat user baru di database.
  // Data name, email, dan password hash akan diterima sebagai parameter.
  // Setelah user berhasil dibuat, data user yang baru dibuat akan dikembalikan.
  async createUser(name: string, email: string, passwordHash: string) {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { name, email, password: passwordHash },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          department: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      await tx.userHistory.create({
        data: {
          userId: user.id,
          userName: user.name,
          field: 'user',
          newValue: `${user.name} (${user.email})`,
          action: 'CREATE',
          status: true,
          changedBy: user.id,
        },
      });

      return user;
    });
  }

  // Opsional: update password
  async updatePassword(userId: string, newHash: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { password: newHash },
      select: { id: true },
    });
  }

  // Opsional: hapus user
  async deleteUser(userId: string) {
    return this.prisma.user.delete({
      where: { id: userId },
      select: { id: true },
    });
  }
}
