import { ApiProperty } from '@nestjs/swagger';

export default class WithdrawBalanceWalletDTO {
  @ApiProperty({ description: 'Wallet identification' })
  public walletId: number;

  @ApiProperty({ description: 'Currency exchange identification' })
  public currencyId: number;

  @ApiProperty({ description: 'Withdraw amount value' })
  public amount: number;
}
