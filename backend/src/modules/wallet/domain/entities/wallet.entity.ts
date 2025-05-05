import { JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { BaseEntity } from '@core/database/domain/entities/base.entity';
import { EntityTable } from '@core/database/domain/decorators/table-entity.decorator';
import { ColumnEntity } from '@core/database/domain/decorators/column-entity.decorator';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { CurrencyExchangeEntity } from '@modules/currency-exchange/domain/entities/currency-exchange.entity';
import { FiatTransactionEntity } from '@modules/fiat-transaction/domain/entities/fiat-transaction.entity';

@EntityTable('wallets', 'Table to store wallet data')
export class WalletEntity extends BaseEntity {
  @ColumnEntity({
    description: 'Wallet balance',
    name: 'balance',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 0,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  public balance: number;

  @OneToOne(() => UserEntity, (user) => user.wallet)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => CurrencyExchangeEntity, { eager: true })
  @JoinColumn({ name: 'currency_id', referencedColumnName: 'id' })
  currency: CurrencyExchangeEntity;

  @OneToMany(
    () => FiatTransactionEntity,
    (fiatTransaction) =>
      fiatTransaction.recipientWallet || fiatTransaction.senderWallet,
  )
  fiatTransactions: FiatTransactionEntity[];

  //   @OneToMany(() => CryptoBalance, (cryptoBalance) => cryptoBalance.wallet)
  //   cryptoBalances: CryptoBalance[];
}
