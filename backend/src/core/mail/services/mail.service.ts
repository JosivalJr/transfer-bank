import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EnvironmentVariablesProvider } from '@core/enviroment-variables/providers/enviroment-variables.provider';

import { PasswordRecoveryMailProvider } from './providers/mails/password-recovery-mail.provider';

@Injectable()
export class MailService {
  public passwordRecovery: PasswordRecoveryMailProvider;

  public constructor(
    private readonly mailerService: MailerService,
    private readonly env: EnvironmentVariablesProvider,
  ) {
    this.passwordRecovery = new PasswordRecoveryMailProvider(
      mailerService,
      env,
    );
  }
}
