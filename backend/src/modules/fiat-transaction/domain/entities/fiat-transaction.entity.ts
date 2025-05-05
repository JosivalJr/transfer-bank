import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '@core/database/domain/entities/base.entity';
import { EntityTable } from '@core/database/domain/decorators/table-entity.decorator';
import { ColumnEntity } from '@core/database/domain/decorators/column-entity.decorator';
import { WalletEntity } from '@modules/wallet/domain/entities/wallet.entity';
import { EFiatTransaction } from '../enums/fiat-transaction.enum';
import { CurrencyExchangeEntity } from '@modules/currency-exchange/domain/entities/currency-exchange.entity';

@EntityTable('fiat-transactions', 'Table to store fiat transactions data')
export class FiatTransactionEntity extends BaseEntity {
  @ColumnEntity({
    type: 'enum',
    enum: EFiatTransaction,
    description: 'Transaction type',
    example: EFiatTransaction.DEPOSIT,
  })
  public type: EFiatTransaction;

  @ColumnEntity({
    description: 'Transaction amount',
    name: 'amount',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 0,
  })
  public amount: number;

  @ManyToOne(() => CurrencyExchangeEntity, { eager: true })
  @JoinColumn({ name: 'currency_id', referencedColumnName: 'id' })
  currency: CurrencyExchangeEntity;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.fiatTransactions)
  @JoinColumn({ name: 'sender_wallet_id', referencedColumnName: 'id' })
  senderWallet: WalletEntity;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.fiatTransactions)
  @JoinColumn({ name: 'recipient_wallet_id', referencedColumnName: 'id' })
  recipientWallet: WalletEntity;
}
