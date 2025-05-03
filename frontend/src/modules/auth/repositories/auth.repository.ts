import { Repository } from '@/core/http/repository';
import { Message } from '@/shared/domain/types';
import { User } from '@/modules/user/domain/entities';
import {
  CreateAccountRequestDTO,
  LoginRequestDTO,
  LoginResponseDTO,
  RecoverRequestDTO,
  ResetRequestDTO,
} from '../domain/dto';

export class AuthRepository extends Repository {
  static instance: AuthRepository;

  constructor() {
    super('auth');

    if (AuthRepository.instance) {
      return AuthRepository.instance;
    }

    AuthRepository.instance = this;
  }

  public async login(login: LoginRequestDTO): Promise<LoginResponseDTO> {
    const { status, data } = await this.http.post<
      LoginResponseDTO,
      LoginRequestDTO
    >('/login', login);

    if (this.isOK(status)) {
      return data;
    }

    throw new Error('Oops, something unexpected happened!');
  }

  public async check(): Promise<User> {
    const { status, data } = await this.http.get<User>('/user');

    if (this.isOK(status)) return new User(data);

    throw new Error('Oops, something unexpected happened!');
  }

  public async createAccount(
    dto: CreateAccountRequestDTO,
  ): Promise<LoginResponseDTO> {
    const { status, data } = await this.http.post<
      LoginResponseDTO,
      LoginRequestDTO
    >('/create-account', dto);

    if (this.isOK(status)) {
      return data;
    }

    throw new Error('Oops, something unexpected happened!');
  }

  public async recover(recover: RecoverRequestDTO): Promise<Message> {
    const { status, data } = await this.http.post<Message, RecoverRequestDTO>(
      '/password/recovery',
      recover,
    );

    if (this.isOK(status)) {
      return data;
    }

    throw new Error('Oops, something unexpected happened!');
  }

  public async reset(reset: ResetRequestDTO): Promise<Message> {
    const { status, data } = await this.http.patch<Message, ResetRequestDTO>(
      '/password/reset',
      reset,
    );

    if (this.isOK(status)) {
      return data;
    }

    throw new Error('Oops, something unexpected happened!');
  }
}
