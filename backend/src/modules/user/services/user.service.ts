import { Injectable } from '@nestjs/common';

import { UserRepository } from '../domain/repositories/user.repository';
import { CreateUserProvider } from './providers/create-user.provider';

@Injectable()
export class UserService {
  public create: CreateUserProvider;

  public constructor(private readonly userRepository: UserRepository) {
    this.create = new CreateUserProvider(this.userRepository);
  }
}
