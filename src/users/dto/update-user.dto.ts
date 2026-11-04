import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  IsEnum,
  IsOptional,
  MinLength,
} from 'class-validator';
import { Department, Role, Position } from 'generated/prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsEnum(Department)
  department?: Department;

  
  @IsOptional()
  @IsEnum(Position)
  position?: Position;
  // @ApiPropertyOptional({ example: 'User 1', description: 'User name' })
  // @IsOptional()
  // @IsString()
  // @MaxLength(50)
  // name?: string;

  // @ApiPropertyOptional({ example: 'user1@gmail.com', description: 'User email' })
  // @IsOptional()
  // @IsEmail()
  // email?: string;

  // @ApiPropertyOptional({ example: 'SecurePass123', description: 'User password' })
  // @IsOptional()
  // @Matches('^[a-zA-Z0-9]+$', 'i', { message: 'Password must contain only alphanumeric characters' })
  // password?: string;

  // @ApiPropertyOptional({ example: 'USER', description: 'User role', enum: Role })
  // @IsOptional()
  // @IsEnum(Role)
  // role?: Role;
}
