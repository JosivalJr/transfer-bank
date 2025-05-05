import { ApiProperty } from '@nestjs/swagger';
import { FindManyDTO } from '@shared/dtos/find-many.dto';

export default class FindManyCurrencyExchangeDTO extends FindManyDTO {
  @ApiProperty({ description: 'Filter by name/symbol currency exchange' })
  public search?: number;
}
