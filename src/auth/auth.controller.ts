import {
  Controller,
  Post,
  Body,
  HttpCode,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from './jwt-auth.guard';

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
  login(@Body() credentials: LoginDto, @Req() request: Request) {
    return this.authService.login(credentials, request);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('logout')
  logout(@Req() request: Request & { user: { userId: string } }) {
    return this.authService.logout(request.user.userId, request);
  }
}
