import {
  RecoverRequestDTO,
  LoginRequestDTO,
  ResetRequestDTO,
  CreateAccountRequestDTO,
} from '../dto';
import { Auth } from './';

export interface UseAuth extends Auth {
  login: (data: LoginRequestDTO) => Promise<void>;
  logout: () => Promise<void>;
  createAccount: (data: CreateAccountRequestDTO) => Promise<void>;
  recover: (data: RecoverRequestDTO) => Promise<string>;
  reset: (data: ResetRequestDTO) => Promise<string>;
  loading: boolean;
  refreshUser: () => Promise<void>;
}
