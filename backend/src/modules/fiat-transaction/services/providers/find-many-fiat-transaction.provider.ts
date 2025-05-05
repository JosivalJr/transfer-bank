import FindManyFiatTransactionDTO from '@modules/fiat-transaction/domain/dto/find-many-fiat-transaction.dto';
import { FiatTransactionRepository } from '@modules/fiat-transaction/domain/repositories/fiat-repository.repository';
import { WalletRepository } from '@modules/wallet/domain/repositories/wallet.repository';

export default class FindManyFiatTransactionProvider {
  public constructor(
    private readonly fiatTransactionRepository: FiatTransactionRepository,
    private readonly walletRepository: WalletRepository,
  ) {}

  public async execute(dto: FindManyFiatTransactionDTO) {
    const [data, total] =
      await this.fiatTransactionRepository.manager.findAndCount({
        // where: dto?.walletId
        //   ? {
        //       senderWallet: {
        //         id: dto.walletId,
        //       },
        //       recipientWallet: {
        //         id: dto.walletId,
        //       },
        //     }
        //   : undefined,
        take: dto.take ?? 20,
        skip: dto.skip ?? 0,
      });

    const pages = total ? Math.round(total / 20) : 0;

    return {
      data,
      total,
      pages,
    };
  }
}
