import WithdrawBalanceWalletDTO from '@modules/wallet/domain/dto/withdraw-balance-wallet.dto';
import { FiatTransactionRepository } from '@modules/fiat-transaction/domain/repositories/fiat-repository.repository';
import { WalletRepository } from '@modules/wallet/domain/repositories/wallet.repository';

export default class WithdrawBalanceWalletProvider {
  public constructor(
    private readonly fiatTransactionRepository: FiatTransactionRepository,
    private readonly walletRepository: WalletRepository,
  ) {}

  public async execute(dto: WithdrawBalanceWalletDTO) {}
}
