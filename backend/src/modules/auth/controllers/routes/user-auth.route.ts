import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Endpoint } from '@core/base/decorators/endpoint.decorator';
import { AuthUser } from '@modules/auth/domain/decorators/auth-user.decorator';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { AuthController } from '../decorators/auth-controller.decorator';

@AuthController.user()
export class UserAuthController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  @Endpoint.get({
    url: '/',
    description: 'Search logged in user data',
    responses: [
      {
        status: 200,
        description: 'Logged in user data',
      },
    ],
  })
  public async getUser(@AuthUser() user: UserEntity) {
    const userWithWallet = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['wallet'],
    });

    return userWithWallet;
  }
}
