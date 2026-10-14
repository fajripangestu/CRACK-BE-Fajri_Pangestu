import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwt: JwtService,
  ) {}

  // Data name, email, dan password dari user akan diterima melalui RegisterDto
  // kemudian password akan di-hash menggunakan bcrypt sebelum disimpan ke database
  // Setelah user berhasil dibuat, token JWT akan dihasilkan menggunakan secret key yang disimpan di environment variable
  // Token ini akan dikembalikan bersama dengan data user yang baru dibuat.
  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.authRepository.createUser(dto.name, dto.email, hash);
    const secret = process.env.JWT_SECRET || 'default_secret_key'; // Fallback secret key
    
    const token = jwt.sign({ sub: user.id }, secret, {
      expiresIn: '1h',
    });

    return { user, token };
  }

  // User login dengan mengirimkan email dan password melalui LoginDto yang ada di body request. Sistem akan memverifikasi kredensial tersebut.
  // Jika valid, sistem akan menghasilkan token JWT yang dapat digunakan untuk mengakses endpoint yang dilindungi.
  async login(credentials: LoginDto) {
    const user = await this.authRepository.findOneUserByEmail(credentials.email);
    if (!user) throw new UnauthorizedException('Email atau password salah');

    const valid = await bcrypt.compare(credentials.password, user.password);
    if (!valid) throw new UnauthorizedException('Email atau password salah');

    const token = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    }, { expiresIn: '1h' });

    return { access_token: token, user };
  }
}
