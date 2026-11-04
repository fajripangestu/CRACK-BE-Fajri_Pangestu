import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, Matches, MaxLength } from 'class-validator';
import { Position, Role } from 'generated/prisma/client';
import { Department } from 'generated/prisma/client';

export class CreateUserDto {
  @ApiProperty({
    example: 'User 1',
    description: 'User name',
  })
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: 'user1@gmail.com',
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'SecurePass123',
    description: 'User password',
  })
  @Matches('^[a-zA-Z0-9]+$', 'i', {
    message: 'Password must contain only alphanumeric characters',
  })
  password: string;

  @ApiProperty({
    example: 'user',
    description: 'User role',
  })
  @IsEnum(Role)
  @MaxLength(50)
  role: Role;

  @ApiProperty({
    example: 'user',
    description: 'User department',
  })
  @IsEnum(Department)
  @MaxLength(50)
  department: Department;

  @ApiProperty({
    example: 'user',
    description: 'User position',
  })
  @IsEnum(Position)
  @MaxLength(50)
  position: Position;
}
