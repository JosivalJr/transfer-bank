import { HttpException } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import WithdrawBalanceWalletDTO from '@modules/wallet/domain/dto/withdraw-balance-wallet.dto';
import { WalletRepository } from '@modules/wallet/domain/repositories/wallet.repository';
import { WalletEntity } from '@modules/wallet/domain/entities/wallet.entity';
import { FiatTransactionEntity } from '@modules/fiat-transaction/domain/entities/fiat-transaction.entity';
import { EFiatTransaction } from '@modules/fiat-transaction/domain/enums/fiat-transaction.enum';
import { CurrencyExchangeEntity } from '@modules/currency-exchange/domain/entities/currency-exchange.entity';
import { CurrencyExchangeRepository } from '@modules/currency-exchange/domain/repositories/currency-exchange.repository';

type WithdrawBalanceWalletProps = {
  dto: WithdrawBalanceWalletDTO;
};

export default class WithdrawBalanceWalletProvider {
  public constructor(
    private readonly walletRepository: WalletRepository,
    private readonly currencyExchangeRepository: CurrencyExchangeRepository,
  ) {}

  public async execute({ dto }: WithdrawBalanceWalletProps) {
    const wallet = await this.getWallet(dto.walletId);
    const currency = await this.getCurrency(dto.currencyId);

    if (wallet.balance < dto.amount) {
      throw new HttpException(
        'Insufficient wallet balance to withdraw this value.',
        412,
      );
    }

    const balance = wallet.balance - dto.amount;

    return await this.walletRepository.transaction(async (query) => {
      return await this.updateWalletWithTransaction(
        wallet,
        dto,
        currency,
        balance,
        query,
      );
    });
  }

  private async getWallet(id: number): Promise<WalletEntity> {
    const wallet = await this.walletRepository.manager.findOne({
      where: { id },
      withDeleted: true,
    });

    if (wallet && wallet.deletedAt)
      throw new HttpException(
        'This wallet has been removed from the system. To reuse this wallet, please contact support.',
        412,
      );

    if (!wallet) throw new HttpException('Wallet not founded', 404);

    return wallet;
  }

  private async getCurrency(id: number): Promise<CurrencyExchangeEntity> {
    const currencyExchange =
      await this.currencyExchangeRepository.manager.findOne({
        where: { id },
        withDeleted: true,
      });

    if (currencyExchange && currencyExchange.deletedAt)
      throw new HttpException(
        'Transactions with this currency exchange has been removed from the system.',
        412,
      );

    if (!currencyExchange)
      throw new HttpException('Currency exchange not founded', 404);

    return currencyExchange;
  }

  private async updateWalletWithTransaction(
    wallet: WalletEntity,
    dto: WithdrawBalanceWalletDTO,
    currency: CurrencyExchangeEntity,
    balance: number,
    query: QueryRunner,
  ) {
    const updatedWallet = await query.manager.save(
      await this.serializeWalletData(wallet, balance),
    );

    await query.manager.save(
      await this.serializeFiatTransactionData(dto, currency, wallet),
    );

    return updatedWallet;
  }

  private async serializeWalletData(wallet: WalletEntity, balance: number) {
    return plainToInstance(
      WalletEntity,
      {
        ...wallet,
        balance,
      },
      { ignoreDecorators: true },
    );
  }

  private async serializeFiatTransactionData(
    dto: WithdrawBalanceWalletDTO,
    currency: CurrencyExchangeEntity,
    wallet: WalletEntity,
  ) {
    return plainToInstance(
      FiatTransactionEntity,
      {
        type: EFiatTransaction.WITHDRAW,
        amount: dto.amount,
        currency: currency,
        senderWallet: wallet,
        recipientWallet: null,
      },
      { ignoreDecorators: true },
    );
  }
}
