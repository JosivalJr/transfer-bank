import { Query } from '@nestjs/common';

import { Endpoint } from '@core/base/decorators/endpoint.decorator';
import FindManyCurrencyExchangeDTO from '@modules/fiat-transaction/domain/dto/find-many-fiat-transaction.dto';
import { CurrencyExchangeController } from '../decorator/currency-exchange.decorator';
import { CurrencyExchangeService } from '@modules/currency-exchange/services/currency-exchange.service';

@CurrencyExchangeController.default()
export class DefaultCurrencyExchangeController {
  public constructor(
    private readonly currencyExchangeService: CurrencyExchangeService,
  ) {}

  @Endpoint.get({
    url: '/',
    description: 'List currency exchange',
    responses: [
      {
        description: 'Paginated currency exchange data',
        status: 200,
      },
    ],
  })
  public async findMany(@Query() dto: FindManyCurrencyExchangeDTO) {
    return await this.currencyExchangeService.findMany.execute(dto);
  }
}
