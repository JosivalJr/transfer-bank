import { FiatTransactionRepository } from '@modules/fiat-transaction/domain/repositories/fiat-repository.repository';
import TransferBalanceWalletDTO from '@modules/wallet/domain/dto/transfer-balance-wallet.dto';
import { WalletRepository } from '@modules/wallet/domain/repositories/wallet.repository';

export default class TransferBalanceWalletProvider {
  public constructor(
    private readonly fiatTransactionRepository: FiatTransactionRepository,
    private readonly walletRepository: WalletRepository,
  ) {}

  public async execute(dto: TransferBalanceWalletDTO) {}
}
