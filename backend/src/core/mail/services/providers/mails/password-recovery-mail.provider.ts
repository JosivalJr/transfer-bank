import { MailerService } from '@nestjs-modules/mailer';

import { EnvironmentVariablesProvider } from '@core/enviroment-variables/providers/enviroment-variables.provider';
import { EmailProvider } from '../mail.provider';

export class PasswordRecoveryMailProvider extends EmailProvider<{
  userName: string;
  token: string;
}> {
  public constructor(
    mailerService: MailerService,
    private readonly env: EnvironmentVariablesProvider,
  ) {
    super(
      'password-recovery-mail',
      'password-recovery',
      'Transfer bank - Password recovery',
      mailerService,
    );
  }

  public async execute(data: {
    data: {
      userName: string;
      token: string;
    };
    to: string;
  }) {
    this.apply(data);
  }

  protected async configMail({
    userName,
    token,
  }: {
    userName: string;
    token: string;
  }): Promise<object> {
    return {
      user: {
        name: userName,
      },
      urls: {
        reset: `${this.env.application.client}/recover-password/new-password?token=${token}`,
      },
    };
  }
}
