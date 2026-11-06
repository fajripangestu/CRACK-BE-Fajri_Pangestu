import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeOwnPasswordDto } from './dto/change-own-password.dto';
import { Prisma } from 'generated/prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAllUsers() {
    return this.prisma.user.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        position: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async getOneUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        position: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateUser(id: string, dto: UpdateUserDto, modifierId: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User tidak ditemukan');

    // Hanya field yang benar-benar berubah
    const fields = ['name', 'email', 'role', 'department', 'position'] as const;
    const changed = fields.filter(
      (f) => dto[f] !== undefined && dto[f] !== user[f],
    );
    // console.log('DTO:', dto, '| field berubah:', changed);
    if (changed.length === 0) return user;

    try {
      const [updated] = await this.prisma.$transaction([
        this.prisma.user.update({
          where: { id },
          data: Object.fromEntries(changed.map((f) => [f, dto[f]])),
        }),
        // Satu baris riwayat per field yang berubah
        ...changed.map((f) =>
          this.prisma.userHistory.create({
            data: {
              userId: id,
              userName: changed.includes('name') ? String(dto.name) : user.name,
              field: f,
              oldValue: String(user[f]),
              newValue: String(dto[f]),
              action: 'EDIT',
              status: user.isActive,
              changedBy: modifierId,
            },
          }),
        ),
      ]);
      return updated;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException('Email sudah dipakai user lain');
      }
      throw e;
    }
  }

  async changeOwnPassword(userId: string, dto: ChangeOwnPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, password: true, isActive: true },
    });
    if (!user || !user.isActive) {
      throw new NotFoundException('User tidak ditemukan');
    }

    if (!(await bcrypt.compare(dto.currentPassword, user.password))) {
      throw new UnauthorizedException('Password saat ini salah');
    }

    const password = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: { password },
      }),
      this.prisma.userHistory.create({
        data: {
          userId,
          userName: user.name,
          field: 'password',
          action: 'EDIT',
          status: user.isActive,
          changedBy: userId,
        },
      }),
    ]);

    return { message: 'Password berhasil diperbarui' };
  }

  async createUser(data: CreateUserDto, modifierId: string) {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
          department: data.department,
          position: data.position,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          department: true,
          position: true,
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
          changedBy: modifierId,
        },
      });

      return user;
    });
  }

  async removeUser(id: string, modifierId: string) {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id } });
      if (!user) throw new NotFoundException('User tidak ditemukan');
      if (!user.isActive) throw new NotFoundException('User tidak ditemukan');

      const deactivated = await tx.user.update({
        where: { id },
        data: { isActive: false },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          department: true,
          position: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      await tx.userHistory.create({
        data: {
          userId: user.id,
          userName: user.name,
          field: 'user',
          oldValue: `${user.name} (${user.email})`,
          action: 'DELETE',
          status: deactivated.isActive,
          changedBy: modifierId,
        },
      });

      return deactivated;
    });
  }

  async logUserHistory(data: {
    userId: string;
    field: string;
    oldValue?: string | null;
    newValue?: string | null;
    changedBy: string;
  }) {
    return this.prisma.userHistory.create({ data });
  }
}
