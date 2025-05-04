import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { PasswordHelper } from '@modules/user/domain/helpers/password.helper';

export class UserSeed1746311075379 implements Seeder {
  track = false;

  private masterUserEmail = 'admin@admin.dev';

  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(UserEntity);

    const hasUserMaster = await userRepository.exists({
      where: { email: this.masterUserEmail },
    });

    if (hasUserMaster) {
      console.info('Previously executed user seed.');
      return;
    }

    const password = await PasswordHelper.hash('Admin@2025');

    await userRepository.save({
      name: 'Root Admin',
      cpf: '80308956079',
      email: this.masterUserEmail,
      password,
    });

    console.info('User seed executed successfully!');
  }
}
