import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

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
        createdAt: true,
        updatedAt: true,
        password: true,
      }
    });
  }

  // Membuat user baru
  // Fungsi ini digunakan untuk membuat user baru di database.
  // Data name, email, dan password hash akan diterima sebagai parameter.
  // Setelah user berhasil dibuat, data user yang baru dibuat akan dikembalikan.
  async createUser(name: string, email: string, passwordHash: string) {
    return this.prisma.user.create({
      data: { name, email, password: passwordHash },
    });
  }

  // Opsional: update password
  async updatePassword(userId: number, newHash: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { password: newHash },
    });
  }

  // Opsional: hapus user
  async deleteUser(userId: number) {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
