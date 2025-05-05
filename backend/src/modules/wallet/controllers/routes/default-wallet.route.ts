import { Body } from '@nestjs/common';

import { Endpoint } from '@core/base/decorators/endpoint.decorator';
import DepositWalletDTO from '@modules/wallet/domain/dto/deposit-balance-wallet.dto';
import WithdrawWalletDTO from '@modules/wallet/domain/dto/withdraw-balance-wallet.dto';
import TransferWalletDTO from '@modules/wallet/domain/dto/transfer-balance-wallet.dto';
import { WalletController } from '../decorator/wallet.decorator';
import { WalletService } from '@modules/wallet/services/wallet.service';

@WalletController.default()
export class DefaultWalletController {
  public constructor(private readonly fiatTransactionService: WalletService) {}

  @Endpoint.post({
    url: '/deposit',
    description: 'Deposit transaction',
    responses: [
      {
        description: 'Fiat transaction data',
        status: 200,
      },
    ],
  })
  public async deposit(@Body() dto: DepositWalletDTO) {
    return await this.fiatTransactionService.depositTransaction.execute({
      dto,
    });
  }

  @Endpoint.post({
    url: '/withdraw',
    description: 'Withdraw transaction',
    responses: [
      {
        description: 'Fiat transaction data',
        status: 200,
      },
    ],
  })
  public async withdraw(@Body() dto: WithdrawWalletDTO) {
    return await this.fiatTransactionService.withdrawTransaction.execute({
      dto,
    });
  }

  @Endpoint.post({
    url: '/transfer',
    description: 'Transfer transaction',
    responses: [
      {
        description: 'Fiat transaction data',
        status: 200,
      },
    ],
  })
  public async transfer(@Body() dto: TransferWalletDTO) {
    return await this.fiatTransactionService.transferTransaction.execute({
      dto,
    });
  }
}
