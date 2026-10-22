import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, BadRequestException, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Get()
  getAllUsers(){
    return this.usersService.getAllUsers();
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Get(':id')
  getOneUserById(@Param('id', ParseIntPipe) id: number){
    return this.usersService.getOneUserById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: { user: { userId: number } },
  ) {
    const modifierId = req.user.userId;

    if (!updateUserDto.name && !updateUserDto.email && !updateUserDto.role) {
      throw new BadRequestException('Tidak ada data yang diubah');
    }

    return await this.usersService.updateUser(id, updateUserDto, modifierId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user: { userId: number } },
  ) {
    const modifierId = req.user.userId;
    return this.usersService.remove(id, modifierId);
  }
}
