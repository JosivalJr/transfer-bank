import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { EnvironmentVariablesModule } from '@core/enviroment-variables/enviroment-variables.module';
import { MailModule } from '@core/mail/mail.module';
import { DatabaseModule } from '@core/database/database.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/api/public',
      exclude: ['mail'],
    }),
    MulterModule.register({}),
    EnvironmentVariablesModule,
    DatabaseModule,
    AuthModule,
    MailModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
