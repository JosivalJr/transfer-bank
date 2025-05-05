import { Injectable } from '@nestjs/common';

import DepositBalanceWalletProvider from './providers/deposit-balance-wallet.provider';
import WithdrawBalanceWalletProvider from './providers/withdraw-balance-wallet.provider';
import TransferBalanceWalletProvider from './providers/transfer-balance-wallet.provider';
import { WalletRepository } from '../domain/repositories/wallet.repository';
import { CurrencyExchangeRepository } from '@modules/currency-exchange/domain/repositories/currency-exchange.repository';

@Injectable()
export class WalletService {
  public readonly depositTransaction: DepositBalanceWalletProvider;
  public readonly withdrawTransaction: WithdrawBalanceWalletProvider;
  public readonly transferTransaction: TransferBalanceWalletProvider;

  public constructor(
    public readonly currencyExchangeRepository: CurrencyExchangeRepository,
    public readonly walletRepository: WalletRepository,
  ) {
    this.depositTransaction = new DepositBalanceWalletProvider(
      this.walletRepository,
      this.currencyExchangeRepository,
    );

    this.withdrawTransaction = new WithdrawBalanceWalletProvider(
      this.walletRepository,
      this.currencyExchangeRepository,
    );

    this.transferTransaction = new TransferBalanceWalletProvider(
      this.walletRepository,
      this.currencyExchangeRepository,
    );
  }
}
