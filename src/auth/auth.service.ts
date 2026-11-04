import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Department, Prisma, Role } from 'generated/prisma/client';
import { JwtPayload } from './jwt-payload.interface';

const DUMMY_HASH = bcrypt.hashSync('dummy-password', 10);

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwt: JwtService,
  ) {}

  private signToken(user: { id: string; email: string; role: Role; department: Department }) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      department: user.department,
    };

    return this.jwt.signAsync(payload, { expiresIn: '1h' });
  }

  // Data name, email, dan password dari user akan diterima melalui RegisterDto
  // kemudian password akan di-hash menggunakan bcrypt sebelum disimpan ke database
  // Setelah user berhasil dibuat, token JWT akan dihasilkan menggunakan secret key yang disimpan di environment variable
  // Token ini akan dikembalikan bersama dengan data user yang baru dibuat.
  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    try {
      const user = await this.authRepository.createUser(
        dto.name,
        dto.email,
        hash,
      );
      const access_token = await this.signToken(user);
      return { access_token, user };
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException('Email sudah terdaftar');
      }
      throw e;
    }
  }

  // User login dengan mengirimkan email dan password melalui LoginDto yang ada di body request. Sistem akan memverifikasi kredensial tersebut.
  // Jika valid, sistem akan menghasilkan token JWT yang dapat digunakan untuk mengakses endpoint yang dilindungi.
  async login(credentials: LoginDto) {
    const user = await this.authRepository.findOneUserByEmail(
      credentials.email,
    );

    const valid = await bcrypt.compare(
      credentials.password,
      user?.password ?? DUMMY_HASH,
    );

    if (!user || !valid || !user.isActive)
      throw new UnauthorizedException('Email atau password salah');

    const access_token = await this.signToken(user);

    // Jangan kirim hash password ke client
    const { password, ...safeUser } = user;

    return { access_token: access_token, user: safeUser };
  }
}
