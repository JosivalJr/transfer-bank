import { Wallet } from '@/modules/wallet/domain/entities/wallet.entity';
import { User } from '@modules/user/domain/entities';

export interface Auth {
  authenticated: boolean;
  user: User | null;
  wallet: Wallet | null;
}
