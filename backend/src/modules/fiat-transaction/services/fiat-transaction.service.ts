import { Injectable } from '@nestjs/common';
import FindManyFiatTransactionProvider from './providers/find-many-fiat-transaction.provider';
import { FiatTransactionRepository } from '../domain/repositories/fiat-repository.repository';
import { WalletRepository } from '@modules/wallet/domain/repositories/wallet.repository';

@Injectable()
export class FiatTransactionService {
  public readonly findMany: FindManyFiatTransactionProvider;

  public constructor(
    public readonly fiatTransactionRepository: FiatTransactionRepository,
    public readonly walletRepository: WalletRepository,
  ) {
    this.findMany = new FindManyFiatTransactionProvider(
      this.fiatTransactionRepository,
      this.walletRepository,
    );
  }
}
