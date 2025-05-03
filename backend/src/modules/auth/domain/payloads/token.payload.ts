import { ApiProperty } from '@nestjs/swagger';

export class TokenPayload {
  @ApiProperty({ description: 'User identification' })
  public id: number;

  @ApiProperty({ description: 'User email' })
  public email: string;
}
