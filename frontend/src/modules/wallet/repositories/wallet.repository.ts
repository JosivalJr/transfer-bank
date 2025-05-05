import { Repository } from '@/core/http/repository';

import { Wallet } from '../domain/entities/wallet.entity';
import {
  WalletDepositTransactionDTO,
  WalletTransferTransactionDTO,
  WalletWithdrawTransactionDTO,
} from '../domain/dto';

export class WalletRepository extends Repository {
  static instance: WalletRepository;

  constructor() {
    super('wallet');

    if (WalletRepository.instance) {
      return WalletRepository.instance;
    }

    WalletRepository.instance = this;
  }

  public async deposit(record: WalletDepositTransactionDTO): Promise<Wallet> {
    const { status, data } = await this.http.post<
      Wallet,
      WalletDepositTransactionDTO
    >('/deposit', record);

    if (this.isOK(status)) return new Wallet(data);

    throw new Error('Oops, something unexpected happened!');
  }

  public async withdraw(record: WalletWithdrawTransactionDTO): Promise<Wallet> {
    const { status, data } = await this.http.post<
      Wallet,
      WalletWithdrawTransactionDTO
    >('/withdraw', record);

    if (this.isOK(status)) return new Wallet(data);

    throw new Error('Oops, something unexpected happened!');
  }

  public async transfer(record: WalletTransferTransactionDTO): Promise<Wallet> {
    const { status, data } = await this.http.post<
      Wallet,
      WalletTransferTransactionDTO
    >('/transfer', record);

    if (this.isOK(status)) return new Wallet(data);

    throw new Error('Oops, something unexpected happened!');
  }
}
