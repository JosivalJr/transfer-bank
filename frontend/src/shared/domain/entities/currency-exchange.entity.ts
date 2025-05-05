import { DatabaseRegister } from '@/shared/domain/entities';

export class CurrencyExchange extends DatabaseRegister {
  name: string = '';
  symbol: string = '';

  public constructor(partial: Partial<CurrencyExchange>) {
    super(partial);
    Object.assign(this, { ...partial });
  }
}
