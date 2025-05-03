import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { EnvironmentVariablesModule } from '@core/enviroment-variables/enviroment-variables.module';
import { EnvironmentVariablesProvider } from '@core/enviroment-variables/providers/enviroment-variables.provider';

import { MailService } from './services/mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [EnvironmentVariablesProvider],
      imports: [EnvironmentVariablesModule],
      useFactory: (env: EnvironmentVariablesProvider) => ({
        transport: {
          host: env.mail.host,
          port: env.mail.port,
          auth: {
            user: env.mail.user,
            pass: env.mail.pass,
          },
        },
        defaults: {
          from: `<${env.mail.from}>`,
        },
        template: {
          dir: process.cwd() + '/public/mail/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
