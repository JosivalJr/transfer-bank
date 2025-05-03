import { HttpException } from '@nestjs/common';

import { AuthPayload } from '@modules/auth/domain/payloads/auth.payload';
import { UserRepository } from '@modules/user/domain/repositories/user.repository';
import { RefreshTokenDTO } from '@modules/auth/domain/dtos/refresh-token.dto';

import { TokenProvider } from './token.provider';

export class TokenRefreshProvider {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly token: TokenProvider,
  ) {}

  public async execute(dto: RefreshTokenDTO): Promise<AuthPayload> {
    const { id, email } = await this.token.verify(dto.refresh);

    await this.validateUser(email);

    return await this.token.execute({
      id,
      email,
    });
  }

  private async validateUser(email: string): Promise<void> {
    const user = await this.userRepository.manager.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }
  }
}
