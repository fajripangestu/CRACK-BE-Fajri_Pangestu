import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // User membuat akun melalui register (Auth/register)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // User login untuk mendapatkan token (Auth/login)
  // User mengisi email dan password dan dikirim melalui body request ke endpoint login,
  // kemudian sistem akan memverifikasi kredensial tersebut.
  // Jika valid, sistem akan menghasilkan token JWT yang dapat digunakan untuk mengakses endpoint yang dilindungi.
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @HttpCode(200)
  @Post('login')
  login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }
}
