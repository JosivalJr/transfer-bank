import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordResetDTO {
  @ApiProperty({ description: 'Recovery Token' })
  @IsString()
  public token: string;

  @ApiProperty({ description: 'New Password' })
  @IsNotEmpty()
  @IsString()
  public password: string;
}
