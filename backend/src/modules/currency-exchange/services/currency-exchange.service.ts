import { Injectable } from '@nestjs/common';
import { WalletRepository } from '@modules/wallet/domain/repositories/wallet.repository';
import { CurrencyExchangeRepository } from '../domain/repositories/currency-exchange.repository';
import FindManyCurrencyExchangeProvider from './providers/find-many-currency-exchange.provider';

@Injectable()
export class CurrencyExchangeService {
  public readonly findMany: FindManyCurrencyExchangeProvider;

  public constructor(
    public readonly currencyExchangeRepository: CurrencyExchangeRepository,
    public readonly walletRepository: WalletRepository,
  ) {
    this.findMany = new FindManyCurrencyExchangeProvider(
      this.currencyExchangeRepository,
      this.walletRepository,
    );
  }
}
