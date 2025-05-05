import { CurrencyExchange } from '@/shared/domain/entities';

export class Wallet extends CurrencyExchange {
  balance: number = 0;
  currency?: CurrencyExchange;

  public constructor(partial: Partial<Wallet>) {
    super(partial);
    const currency = partial.currency && new CurrencyExchange(partial.currency);
    Object.assign(this, { ...partial, currency });
  }
}
