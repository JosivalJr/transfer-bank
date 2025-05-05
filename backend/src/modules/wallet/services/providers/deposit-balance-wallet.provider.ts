import { HttpException } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import DepositBalanceWalletDTO from '@modules/wallet/domain/dto/deposit-balance-wallet.dto';
import { WalletRepository } from '@modules/wallet/domain/repositories/wallet.repository';
import { WalletEntity } from '@modules/wallet/domain/entities/wallet.entity';
import { FiatTransactionEntity } from '@modules/fiat-transaction/domain/entities/fiat-transaction.entity';
import { EFiatTransaction } from '@modules/fiat-transaction/domain/enums/fiat-transaction.enum';
import { CurrencyExchangeEntity } from '@modules/currency-exchange/domain/entities/currency-exchange.entity';
import { CurrencyExchangeRepository } from '@modules/currency-exchange/domain/repositories/currency-exchange.repository';

type DepositBalanceWalletProps = {
  dto: DepositBalanceWalletDTO;
};

export default class DepositBalanceWalletProvider {
  public constructor(
    private readonly walletRepository: WalletRepository,
    private readonly currencyExchangeRepository: CurrencyExchangeRepository,
  ) {}

  public async execute({ dto }: DepositBalanceWalletProps) {
    const wallet = await this.getWallet(dto.walletId);
    const currency = await this.getCurrency(dto.currencyId);
    const balance = wallet.balance + dto.amount;

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
    dto: DepositBalanceWalletDTO,
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
    const value = plainToInstance(
      WalletEntity,
      {
        ...wallet,
        balance,
      },
      { ignoreDecorators: true },
    );
    return value;
  }

  private async serializeFiatTransactionData(
    dto: DepositBalanceWalletDTO,
    currency: CurrencyExchangeEntity,
    wallet: WalletEntity,
  ) {
    return plainToInstance(
      FiatTransactionEntity,
      {
        type: EFiatTransaction.DEPOSIT,
        amount: dto.amount,
        currency: currency,
        senderWallet: null,
        recipientWallet: wallet,
      },
      { ignoreDecorators: true },
    );
  }
}
