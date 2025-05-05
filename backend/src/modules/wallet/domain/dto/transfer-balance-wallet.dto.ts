import { ApiProperty } from '@nestjs/swagger';

export default class TransferBalanceWalletDTO {
  @ApiProperty({ description: 'Wallet sender identification' })
  public senderWalletId?: number;

  @ApiProperty({ description: 'Wallet recipient identification' })
  public recipientWalletId?: number;

  @ApiProperty({ description: 'Currency exchange identification' })
  public currencyId?: number;

  @ApiProperty({ description: 'Withdraw amount value' })
  public amount?: number;
}
