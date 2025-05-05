import { ApiProperty } from '@nestjs/swagger';
import { FindManyDTO } from '@shared/dtos/find-many.dto';

export default class FindManyFiatTransactionDTO extends FindManyDTO {
  @ApiProperty({ description: 'Wallet identification' })
  public walletId?: number;
}
