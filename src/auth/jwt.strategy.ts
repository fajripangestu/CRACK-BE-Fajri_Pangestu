import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthRepository } from './auth.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
      algorithms: ['HS256'],
    });
  }

  // async validate(payload: any) {
  //   return { userId: payload.sub, email: payload.email, role: payload.role };
  // }

  async validate(payload: JwtPayload) {
    const user = await this.authRepository.findById(payload.sub); // select tanpa password
    if (!user || !user.isActive) throw new UnauthorizedException();
    return { userId: user.id, email: user.email, role: user.role, department: user.department };
  }
}
