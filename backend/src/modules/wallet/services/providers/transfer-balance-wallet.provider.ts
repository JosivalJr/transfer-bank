import { HttpException } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import TransferBalanceWalletDTO from '@modules/wallet/domain/dto/transfer-balance-wallet.dto';
import { WalletRepository } from '@modules/wallet/domain/repositories/wallet.repository';
import { WalletEntity } from '@modules/wallet/domain/entities/wallet.entity';
import { plainToInstance } from 'class-transformer';
import { FiatTransactionEntity } from '@modules/fiat-transaction/domain/entities/fiat-transaction.entity';
import { EFiatTransaction } from '@modules/fiat-transaction/domain/enums/fiat-transaction.enum';
import { CurrencyExchangeEntity } from '@modules/currency-exchange/domain/entities/currency-exchange.entity';
import { CurrencyExchangeRepository } from '@modules/currency-exchange/domain/repositories/currency-exchange.repository';

type TransferBalanceWalletProps = {
  dto: TransferBalanceWalletDTO;
};

export default class TransferBalanceWalletProvider {
  public constructor(
    private readonly walletRepository: WalletRepository,
    private readonly currencyExchangeRepository: CurrencyExchangeRepository,
  ) {}

  public async execute({ dto }: TransferBalanceWalletProps) {
    const senderWallet = await this.getWallet(dto.senderWalletId);
    const recipientWallet = await this.getWallet(dto.recipientWalletId);
    const currency = await this.getCurrencyExchange(dto.currencyId);

    if (senderWallet.balance < dto.amount)
      throw new HttpException('Insufficient sender wallet balance.', 412);

    const senderBalance = senderWallet.balance - dto.amount;
    const recipientBalance = recipientWallet.balance + dto.amount;

    return await this.walletRepository.transaction(async (query) => {
      return await this.updateWalletsWithTransactions(
        senderWallet,
        recipientWallet,
        dto,
        currency,
        senderBalance,
        recipientBalance,
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

  private async getCurrencyExchange(
    id: number,
  ): Promise<CurrencyExchangeEntity> {
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

  private async updateWalletsWithTransactions(
    senderWallet: WalletEntity,
    recipientWallet: WalletEntity,
    dto: TransferBalanceWalletDTO,
    currency: CurrencyExchangeEntity,
    senderBalance: number,
    recipientBalance: number,
    query: QueryRunner,
  ) {
    const updatedSender = await query.manager.save(
      await this.serializeWalletData(senderWallet, senderBalance),
    );

    const updatedRecipient = await query.manager.save(
      await this.serializeWalletData(recipientWallet, recipientBalance),
    );

    const outTransaction = await this.serializeFiatTransactionOut(
      dto,
      currency,
      updatedSender,
      updatedRecipient,
    );

    const inTransaction = await this.serializeFiatTransactionIn(
      dto,
      currency,
      updatedSender,
      updatedRecipient,
    );

    await query.manager.save([outTransaction, inTransaction]);

    return updatedSender;
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

  private async serializeFiatTransactionOut(
    dto: TransferBalanceWalletDTO,
    currency: CurrencyExchangeEntity,
    senderWallet: WalletEntity,
    recipientWallet: WalletEntity,
  ) {
    return plainToInstance(
      FiatTransactionEntity,
      {
        type: EFiatTransaction.TRANSFER_OUT,
        amount: dto.amount,
        currency,
        senderWallet,
        recipientWallet,
      },
      { ignoreDecorators: true },
    );
  }

  private async serializeFiatTransactionIn(
    dto: TransferBalanceWalletDTO,
    currency: CurrencyExchangeEntity,
    senderWallet: WalletEntity,
    recipientWallet: WalletEntity,
  ) {
    return plainToInstance(
      FiatTransactionEntity,
      {
        type: EFiatTransaction.TRANSFER_IN,
        amount: dto.amount,
        currency,
        senderWallet,
        recipientWallet,
      },
      { ignoreDecorators: true },
    );
  }
}
