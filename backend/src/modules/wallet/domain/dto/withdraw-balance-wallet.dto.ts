import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export default class WithdrawBalanceWalletDTO {
  @ApiProperty({ description: 'Wallet identification' })
  @IsNumber()
  public walletId: number;

  @ApiProperty({ description: 'Currency exchange identification' })
  @IsNumber()
  public currencyId: number;

  @ApiProperty({ description: 'Withdraw amount value' })
  @IsNumber()
  public amount: number;
}
