import { Query } from '@nestjs/common';

import { Endpoint } from '@core/base/decorators/endpoint.decorator';
import FindManyFiatTransactionDTO from '@modules/fiat-transaction/domain/dto/find-many-fiat-transaction.dto';
import { FiatTransactionService } from '@modules/fiat-transaction/services/fiat-transaction.service';
import { FiatTransactionController } from '../decorator/fiat-transaction.decorator';
@FiatTransactionController.default()
export class DefaultFiatTransactionController {
  public constructor(
    private readonly fiatTransactionService: FiatTransactionService,
  ) {}

  @Endpoint.get({
    url: '/',
    description: 'List fiat transactions',
    responses: [
      {
        description: 'Paginated fiat transaction data',
        status: 200,
      },
    ],
  })
  public async findMany(@Query() dto: FindManyFiatTransactionDTO) {
    return await this.fiatTransactionService.findMany.execute(dto);
  }
}
