import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { PassportModule } from 'node_modules/@nestjs/passport/dist/passport.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, PrismaService, JwtStrategy, JwtAuthGuard],
  exports:[JwtAuthGuard],
})
export class AuthModule {}
