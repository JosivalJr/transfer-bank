import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { EnvironmentVariablesModule } from '@core/enviroment-variables/enviroment-variables.module';
import { MailModule } from '@core/mail/mail.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/api/public',
      exclude: ['mail'],
    }),
    MulterModule.register({}),
    EnvironmentVariablesModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
