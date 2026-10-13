import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, BadRequestException, Req, UnauthorizedException } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('superadmin')
  getLoginSuperadmin() {
    return new UnauthorizedException('Unauthorized access. Please log in as a superadmin.');
  }

  @Get('admin')
  getLoginAdmin() {
    return new UnauthorizedException('Unauthorized access. Please log in as an admin.');
  }

  @Get('user')
  getLoginUser() {
    return new UnauthorizedException('Unauthorized access. Please log in as a user.');
  }
}
