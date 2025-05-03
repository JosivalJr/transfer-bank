import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ description: 'Username', example: 'John Doe' })
  @IsString()
  @IsNotEmpty({ message: 'Username cannot be empty' })
  @Length(2, 50, {
    message: `Username must contain at least ${2} characters and no more than ${50} characters`,
  })
  public name: string;

  @ApiProperty({
    description: 'User email (must be unique)',
    example: 'user@email.com',
  })
  @IsEmail({}, { message: 'The user email provided is invalid' })
  @MaxLength(256, {
    message: 'User Email can contain a maximum of 256 characters',
  })
  public email: string;

  @ApiProperty({ description: 'User password', example: 'Password@2025' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message: `The password must contain at least ${8} characters,
                including at least ${1} uppercase letter(s),
                ${1} lowercase letter(s), ${1}
                number(s) and ${1} special character(s)`,
    },
  )
  @IsNotEmpty()
  public password: string;
}
