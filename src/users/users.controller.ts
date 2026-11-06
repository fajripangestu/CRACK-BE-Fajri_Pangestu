import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateOwnProfileDto } from './dto/update-own-profile.dto';
import { ChangeOwnPasswordDto } from './dto/change-own-password.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Department } from 'generated/prisma/client';
import { Departments } from 'src/auth/departments.decorator';
import { DepartmentsGuard } from 'src/auth/departments.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard, DepartmentsGuard)
  @Roles('SUPER_ADMIN')
  @Departments(Department.IT)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getOwnProfile(@Req() req: { user: { userId: string } }) {
    return this.usersService.getOneUserById(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateOwnProfile(
    @Body() updateOwnProfileDto: UpdateOwnProfileDto,
    @Req() req: { user: { userId: string } },
  ) {
    if (
      updateOwnProfileDto.name === undefined &&
      updateOwnProfileDto.email === undefined
    ) {
      throw new BadRequestException('Tidak ada data yang diubah');
    }

    return this.usersService.updateUser(
      req.user.userId,
      updateOwnProfileDto,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/password')
  changeOwnPassword(
    @Body() changeOwnPasswordDto: ChangeOwnPasswordDto,
    @Req() req: { user: { userId: string } },
  ) {
    return this.usersService.changeOwnPassword(
      req.user.userId,
      changeOwnPasswordDto,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Get(':id')
  getOneUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getOneUserById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @Req() req: { user: { userId: string } },
  ) {
    return this.usersService.createUser(createUserDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Patch(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: { user: { userId: string } },
  ) {
    const modifierId = req.user.userId;

    if (
      !updateUserDto.name &&
      !updateUserDto.email &&
      !updateUserDto.role &&
      !updateUserDto.department &&
      !updateUserDto.position
    ) {
      throw new BadRequestException('Tidak ada data yang diubah');
    }

    return await this.usersService.updateUser(id, updateUserDto, modifierId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: { user: { userId: string } },
  ) {
    const modifierId = req.user.userId;
    return this.usersService.remove(id, modifierId);
  }
}
