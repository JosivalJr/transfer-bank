import { ApiProperty } from '@nestjs/swagger';

export class MessagePayload {
  @ApiProperty({
    description:
      'Confirmation message stating that the process went as expected',
  })
  public message: string;
}
