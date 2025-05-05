import { Wallet } from '@/modules/wallet/domain/entities/wallet.entity';
import { DatabaseRegister } from '@/shared/domain/entities';

export class User extends DatabaseRegister {
  name: string = '';
  email: string = '';
  resetPassword: boolean = false;

  wallet?: Wallet;

  public constructor(partial: Partial<User>) {
    super(partial);
    const wallet = partial.wallet && new Wallet(partial.wallet);

    Object.assign(this, { ...partial, wallet });
  }
}
