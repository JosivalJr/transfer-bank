import { Body, Param, Query } from '@nestjs/common';

import { Endpoint } from '@core/base/decorators/endpoint.decorator';
import { AuthUser } from '@modules/auth/domain/decorators/auth-user.decorator';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { UserService } from '@modules/user/services/user.service';
import { CreateUserDTO } from '@modules/user/domain/dtos/create-user.dto';

import { UserController } from '../decorators/user-controller.decorator';

@UserController.default()
export class DefaultUserController {
  public constructor(private readonly service: UserService) {}

  @Endpoint.post({
    url: '/',
    description: 'Create a new user',
    dtoName: 'CreateUserDTO',
    responses: [
      {
        description: 'User created successfully',
        status: 200,
        response: UserEntity,
      },
      {
        description: 'An error occurred validating the submitted object',
        status: 412,
      },
    ],
  })
  public async create(
    @Body() dto: CreateUserDTO,
    @AuthUser() authUser: UserEntity,
  ) {
    return await this.service.create.execute({
      dto,
      authUser,
    });
  }
}
