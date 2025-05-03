import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class PasswordRecoveryDTO {
  @ApiProperty({ description: 'User email' })
  @IsEmail()
  public email: string;
}
