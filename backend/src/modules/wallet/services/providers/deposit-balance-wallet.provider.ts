import { FiatTransactionRepository } from '@modules/fiat-transaction/domain/repositories/fiat-repository.repository';
import DepositBalanceWalletDTO from '@modules/wallet/domain/dto/deposit-balance-wallet.dto';
import { WalletRepository } from '@modules/wallet/domain/repositories/wallet.repository';

export default class DepositBalanceWalletProvider {
  public constructor(
    private readonly fiatTransactionRepository: FiatTransactionRepository,
    private readonly walletRepository: WalletRepository,
  ) {}

  public async execute(dto: DepositBalanceWalletDTO) {}
}
