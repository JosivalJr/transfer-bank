import { Body } from '@nestjs/common';

import { Endpoint } from '@core/base/decorators/endpoint.decorator';
import { LoginDTO } from '@modules/auth/domain/dtos/login.dto';
import { AuthService } from '@modules/auth/services/auth.service';
import { AuthPayload } from '@modules/auth/domain/payloads/auth.payload';
import { MessagePayload } from '@shared/payloads/message.payload';
import { RefreshTokenDTO } from '@modules/auth/domain/dtos/refresh-token.dto';
import { PasswordResetDTO } from '@modules/auth/domain/dtos/password-reset.dto';
import { PasswordRecoveryDTO } from '@modules/auth/domain/dtos/password-recovery.dto';

import { AuthController } from '../decorators/auth-controller.decorator';
import { CreateUserDTO } from '@modules/user/domain/dtos/create-user.dto';

@AuthController.default()
export class DefaultAuthController {
  public constructor(private readonly service: AuthService) {}

  @Endpoint.post({
    url: '/create-account',
    description: 'Create a new account',
    dtoName: 'CreateUserDTO',

    responses: [
      {
        status: 200,
        description: 'Account created successfully',
        response: AuthPayload,
      },
      {
        description: 'An error occurred validating the submitted object',
        status: 412,
      },
    ],
  })
  public async create(@Body() dto: CreateUserDTO) {
    return await this.service.createAccount.execute({
      dto,
    });
  }

  @Endpoint.post({
    url: '/login',
    description: 'Log in with a valid username on the platform',
    dtoName: 'LoginDTO',

    responses: [
      {
        status: 200,
        description: 'User successfully logged in',
        response: AuthPayload,
      },
      {
        status: 404,
        description: 'Invalid user email and/or password',
      },
    ],
  })
  public async login(@Body() dto: LoginDTO) {
    return await this.service.login.execute(dto);
  }

  @Endpoint.post({
    url: '/refresh',
    description: 'Creates new tokens based on the refresh token',
    dtoName: 'RefreshTokenDTO',
    responses: [
      {
        status: 200,
        description: 'Token data',
        response: AuthPayload,
      },
      {
        status: 401,
        description: 'Invalid token',
      },
      {
        status: 404,
        description: 'User not found',
      },
      {
        status: 403,
        description: 'Inactive user, please contact your system administrator',
      },
    ],
  })
  public async refresh(@Body() dto: RefreshTokenDTO) {
    return await this.service.tokenRefresh.execute(dto);
  }

  @Endpoint.post({
    url: 'password/recovery',
    description:
      'Request a password recovery for a user by sending an email to that user',
    dtoName: 'PasswordRecoveryDTO',
    withoutLogin: true,
    responses: [
      {
        description: 'Password recovery email sent successfully',
        status: 200,
        response: MessagePayload,
      },
      {
        description: 'User email not found',
        status: 404,
      },
      {
        description: 'An error occurred while sending the email',
        status: 503,
      },
    ],
  })
  public async passwordRecovery(@Body() dto: PasswordRecoveryDTO) {
    return await this.service.passwordRecovery.execute(dto.email);
  }

  @Endpoint.patch({
    url: 'password/reset',
    description: 'Reset user password',
    dtoName: 'PasswordResetDTO',
    withoutLogin: true,
    responses: [
      {
        description: 'Password reset successfully',
        status: 200,
        response: MessagePayload,
      },
      {
        description: 'Invalid token',
        status: 403,
      },
      {
        description: 'User not found',
        status: 404,
      },
    ],
  })
  public async updatePassword(@Body() data: PasswordResetDTO) {
    return await this.service.passwordReset.execute(data);
  }
}
