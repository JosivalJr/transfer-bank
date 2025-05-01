import { User } from '@modules/user/domain/entities';

export interface Auth {
  authenticated: boolean;
  user: User | null;
}
