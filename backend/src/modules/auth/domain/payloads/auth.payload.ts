import { ApiProperty } from '@nestjs/swagger';

export class AuthPayload {
  @ApiProperty({ description: 'Application Access Token' })
  public token: string;

  @ApiProperty({ description: 'Token to perform the token refresh' })
  public refreshToken: string;

  @ApiProperty({
    description: 'Indicator if user needs to change password before accessing',
  })
  public resetPassword?: boolean;
}
