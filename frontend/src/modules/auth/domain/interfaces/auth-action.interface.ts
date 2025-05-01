import { User } from '@/modules/user/domain/entities';
import { EAuthAction } from '../enums';

export interface AuthAction {
  type: EAuthAction;
  user?: User;
}
