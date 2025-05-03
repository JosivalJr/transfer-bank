import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseVariablesProvider } from './variables/database-variables.provider';
import { ApplicationVariablesProvider } from './variables/application-variables.provider';
import { MailVariablesProvider } from './variables/mail-variables.provider';

@Injectable()
export class EnvironmentVariablesProvider {
  /**
   * Indicator if the environment is the Development environment
   */
  public isDevelopment: boolean;

  /**
   * Variables for connecting to the database
   */
  public database: DatabaseVariablesProvider;

  /**
   * API Configuration Variables
   */
  public application: ApplicationVariablesProvider;

  /**
   * Variables for connecting to the SMTP server to send emails
   */
  public mail: MailVariablesProvider;

  public constructor(private readonly configService?: ConfigService) {
    this.database = new DatabaseVariablesProvider(
      this.getAndValidate(`DATABASE_HOST`),
      this.getAndValidate('DATABASE_PORT'),
      this.getAndValidate('DATABASE_NAME'),
      this.getAndValidate('DATABASE_USER'),
      this.getAndValidate('DATABASE_PASS'),
    );

    this.application = new ApplicationVariablesProvider(
      this.getAndValidate('API_PORT'),
      this.getAndValidate('API_URL'),
      this.getAndValidate('API_DOC_PASS'),
      this.getAndValidate('API_AUTH_TOKEN'),
      this.getAndValidate('API_CLIENT_URL'),
    );

    this.mail = new MailVariablesProvider(
      this.getAndValidate('MAIL_HOST'),
      this.getAndValidate('MAIL_PORT', true),
      this.getAndValidate('MAIL_PASS'),
      this.getAndValidate('MAIL_USER'),
      this.getAndValidate('MAIL_FROM'),
    );

    this.isDevelopment = this.getAndValidate('CONFIG_ENV') == 'development';
  }

  private getAndValidate(key: string, optional?: boolean) {
    if (!this) {
      return;
    }

    if (!this.configService) {
      return this.getDataByProcess(key, optional);
    }

    const data = this.configService.get(key);

    if (!data) {
      const dataInProcess = this.getDataByProcess(key, optional);
      return dataInProcess;
    }

    return data;
  }

  private getDataByProcess(key: string, optional?: boolean) {
    const dataInProcess = process.env[key];

    if (!dataInProcess && !optional) {
      throw Error(`Environment Variable ${key} not found`);
    }

    return dataInProcess;
  }
}
