import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { PasswordHelper } from '@modules/user/domain/helpers/password.helper';
import { CurrencyExchangeEntity } from '@modules/currency-exchange/domain/entities/currency-exchange.entity';
import { WalletEntity } from '@modules/wallet/domain/entities/wallet.entity';

export class UserSeed1746311075379 implements Seeder {
  track = false;

  private masterUserEmail = 'admin@admin.dev';

  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(UserEntity);
    const exchangeRepository = dataSource.getRepository(CurrencyExchangeEntity);
    const walletRepository = dataSource.getRepository(WalletEntity);

    const hasUserMaster = await userRepository.exists({
      where: { email: this.masterUserEmail },
    });

    const currency = await exchangeRepository.findOne({
      where: { symbol: 'USD' },
    });

    if (!currency) {
      console.info('Error to execute seed. Default exchange not founded');
      return;
    }

    if (hasUserMaster) {
      console.info('Previously executed user seed.');
      return;
    }

    const password = await PasswordHelper.hash('Admin@2025');

    const user = await userRepository.save({
      name: 'Root Admin',
      cpf: '80308956079',
      email: this.masterUserEmail,
      password,
    });

    await walletRepository.save({
      user,
      currency,
    });

    console.info('User seed executed successfully!');
  }
}
