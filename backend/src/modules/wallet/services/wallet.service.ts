import { Injectable } from '@nestjs/common';
import DepositBalanceWalletDTO from '../domain/dto/deposit-balance-wallet.dto';
import WithdrawBalanceWalletDTO from '../domain/dto/withdraw-balance-wallet.dto';
import DepositBalanceWalletProvider from './providers/deposit-balance-wallet.provider';
import WithdrawBalanceWalletProvider from './providers/withdraw-balance-wallet.provider';
import TransferBalanceWalletProvider from './providers/transfer-balance-wallet.provider';
import { FiatTransactionRepository } from '@modules/fiat-transaction/domain/repositories/fiat-repository.repository';
import { WalletRepository } from '../domain/repositories/wallet.repository';

@Injectable()
export class WalletService {
  public readonly depositTransaction: DepositBalanceWalletProvider;
  public readonly withdrawTransaction: WithdrawBalanceWalletProvider;
  public readonly transferTransaction: TransferBalanceWalletProvider;

  public constructor(
    public readonly fiatTransactionRepository: FiatTransactionRepository,
    public readonly walletRepository: WalletRepository,
  ) {
    this.depositTransaction = new DepositBalanceWalletProvider(
      this.fiatTransactionRepository,
      this.walletRepository,
    );

    this.withdrawTransaction = new WithdrawBalanceWalletProvider(
      this.fiatTransactionRepository,
      this.walletRepository,
    );

    this.transferTransaction = new TransferBalanceWalletProvider(
      this.fiatTransactionRepository,
      this.walletRepository,
    );
  }
}
