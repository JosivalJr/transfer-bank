import { OneToMany } from 'typeorm';

import { BaseEntity } from '@core/database/domain/entities/base.entity';
import { EntityTable } from '@core/database/domain/decorators/table-entity.decorator';
import { ColumnEntity } from '@core/database/domain/decorators/column-entity.decorator';

import { WalletEntity } from '@modules/wallet/domain/entities/wallet.entity';
// import { FiatTransaction } from '@modules/fiat-transaction/domain/entities/fiat-transaction.entity';

@EntityTable('currency-exchanges', 'Table to store currency exchanges')
export class CurrencyExchangeEntity extends BaseEntity {
  @ColumnEntity({
    name: 'symbol',
    type: 'varchar',
    length: 3,
    example: 'USD',
    description: 'Currency exchange symbol',
  })
  public symbol: string;
  @ColumnEntity({
    name: 'name',
    type: 'varchar',
    length: 50,
    example: 'US Dollar',
    description: 'Currency exchange name',
  })
  public name: string;

  @OneToMany(() => WalletEntity, (wallet) => wallet.currency)
  wallets: WalletEntity[];

  // @OneToMany(() => FiatTransaction, (transaction) => transaction.currency)
  // fiatTransactions: FiatTransaction[];
}
