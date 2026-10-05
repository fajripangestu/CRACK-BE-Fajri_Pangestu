import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private authRepo: AuthRepository,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.authRepo.createUser(dto.name, dto.email, hash);
    const secret = process.env.JWT_SECRET || 'default_secret_key'; // Fallback secret key
    
    const token = jwt.sign({ sub: user.id }, secret, {
      expiresIn: '1h',
    });

    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await this.authRepo.findUserByEmail(email);
    
    if (!user) throw new UnauthorizedException('Email tidak ditemukan');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Password salah');

    const token = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    return { access_token: token, user };
  }
}
