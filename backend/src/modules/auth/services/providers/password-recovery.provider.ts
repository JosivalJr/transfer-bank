import { HttpException } from '@nestjs/common';

import { UserRepository } from '@modules/user/domain/repositories/user.repository';
import { MessagePayload } from '@shared/payloads/message.payload';
import { MailService } from '@core/mail/services/mail.service';
import { UserEntity } from '@modules/user/domain/entities/user.entity';

import { TokenProvider } from './token.provider';

export class PasswordRecoveryProvider {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
    private readonly token: TokenProvider,
  ) {}

  public async execute(email: string): Promise<MessagePayload> {
    const user = await this.findUser(email);

    const { token } = await this.token.execute({
      id: user.id,
      email: user.email,
    });

    await this.sendEmail(user, token);

    return {
      message: 'Password recovery email sent successfully',
    };
  }

  private async findUser(email: string) {
    const userWithEmail = await this.userRepository.manager.findOne({
      where: { email },
    });

    if (!userWithEmail) {
      throw new HttpException('User not found', 404);
    }

    return userWithEmail;
  }

  private async sendEmail(user: UserEntity, token: string) {
    await this.mailService.passwordRecovery.execute({
      data: {
        userName: user.name,
        token: token,
      },
      to: user.email,
    });
  }
}
