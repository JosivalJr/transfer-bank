import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ description: 'User email' })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ description: 'Password' })
  @IsString()
  @IsNotEmpty()
  public password: string;
}
