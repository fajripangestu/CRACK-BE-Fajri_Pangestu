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
  
  @Get(':id')
  getOneUserById(@Param('id', ParseIntPipe) id: number){
    return this.usersService.getOneUserById(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  async delegateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: any,
  ) {
    const modifierId = req.user.id; // Ambil ID pengguna yang melakukan perubahan dari token JWT

    if (!updateUserDto.role) {
      throw new BadRequestException('Role is required');
    }
    return await this.usersService.delegateRole(id, updateUserDto.role, modifierId);
  }


  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const modifierId = req.user.id;
    return this.usersService.remove(+id, modifierId);
  }
}
