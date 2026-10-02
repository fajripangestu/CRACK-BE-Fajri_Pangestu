import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Ambil role yang dibutuhkan dari metadata controller
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // kalau tidak ada role spesifik, semua boleh akses
    }

    // Ambil user dari request (biasanya sudah di-attach oleh JwtAuthGuard)
    const { user } = context.switchToHttp().getRequest();

    // Cek apakah role user termasuk dalam requiredRoles
    return requiredRoles.includes(user.role);
  }
}
