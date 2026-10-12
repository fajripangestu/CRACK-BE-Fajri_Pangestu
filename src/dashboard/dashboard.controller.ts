import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, BadRequestException, Req } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Get('superadmin')
  getAllUsers(){
    return this.dashboardService.getAllUsers();
  }
}
