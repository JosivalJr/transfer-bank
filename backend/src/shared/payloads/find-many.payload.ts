import { ApiProperty } from '@nestjs/swagger';

export class FindManyPayload<T> {
  @ApiProperty({ description: 'Total number of elements with this filtering' })
  public total: number;

  @ApiProperty({
    description: 'Total number of pages where elements were separated',
  })
  public pages: number;

  public data: T[];
}
