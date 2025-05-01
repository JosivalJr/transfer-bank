import { DatabaseRegister } from '@/shared/domain/entities';

export class User extends DatabaseRegister {
  name: string = '';
  email: string = '';
  resetPassword: boolean = false;

  public constructor(partial: Partial<User>) {
    super(partial);
    Object.assign(this, { ...partial });
  }
}
