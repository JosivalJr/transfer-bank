import { CurrencyExchangeRepository } from '@modules/currency-exchange/domain/repositories/currency-exchange.repository';
import FindManyCurrencyExchangeDTO from '@modules/fiat-transaction/domain/dto/find-many-fiat-transaction.dto';
import { WalletRepository } from '@modules/wallet/domain/repositories/wallet.repository';

export default class FindManyCurrencyExchangeProvider {
  public constructor(
    private readonly fiatTransactionRepository: CurrencyExchangeRepository,
    private readonly walletRepository: WalletRepository,
  ) {}

  public async execute(dto: FindManyCurrencyExchangeDTO) {
    const [data, total] =
      await this.fiatTransactionRepository.manager.findAndCount({
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
