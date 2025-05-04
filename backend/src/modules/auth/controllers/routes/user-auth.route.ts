import { Endpoint } from '@core/base/decorators/endpoint.decorator';
import { AuthUser } from '@modules/auth/domain/decorators/auth-user.decorator';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { AuthController } from '../decorators/auth-controller.decorator';

@AuthController.user()
export class UserAuthController {
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
  public getUser(@AuthUser() user: UserEntity) {
    return user;
  }
}
