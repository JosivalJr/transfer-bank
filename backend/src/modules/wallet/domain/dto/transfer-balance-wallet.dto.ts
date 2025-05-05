import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export default class TransferBalanceWalletDTO {
  @ApiProperty({ description: 'Wallet sender identification' })
  @IsNumber()
  public senderWalletId: number;

  @ApiProperty({ description: 'Wallet recipient identification' })
  @IsNumber()
  public recipientWalletId: number;

  @ApiProperty({ description: 'Currency exchange identification' })
  @IsNumber()
  public currencyId: number;

  @ApiProperty({ description: 'Withdraw amount value' })
  @IsNumber()
  public amount: number;
}
