import { WalletTransactionDTO } from './';

export interface WalletTransferTransactionDTO extends WalletTransactionDTO {
  senderWalletId: number;
  recipientWalletId: number;
}
