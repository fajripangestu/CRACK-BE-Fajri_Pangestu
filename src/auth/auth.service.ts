import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private authRepo: AuthRepository) {}

  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.authRepo.createUser(dto.name, dto.email, hash);
    const secret = process.env.JWT_SECRET || 'default_secret_key'; // Fallback secret key
    
    const token = jwt.sign({ sub: user.id }, secret, {
      expiresIn: '1h',
    });

    return { user, token };
  }
}
