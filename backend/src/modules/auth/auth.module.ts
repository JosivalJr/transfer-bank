import { JwtModule } from '@nestjs/jwt';
import { forwardRef, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailModule } from '@core/mail/mail.module';
import { UserModule } from '@modules/user/user.module';
import { CurrencyExchangeModule } from '@modules/currency-exchange/currency-exchange.module';
import { EnvironmentVariablesModule } from '@core/enviroment-variables/enviroment-variables.module';
import { EnvironmentVariablesProvider } from '@core/enviroment-variables/providers/enviroment-variables.provider';
import { AuthService } from './services/auth.service';
import { AuthControllers } from './controllers/auth.controller';
import { AuthGuard } from './domain/guards/auth.guard';
import { UserEntity } from '@modules/user/domain/entities/user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [EnvironmentVariablesModule],
      inject: [EnvironmentVariablesProvider],
      useFactory: (env: EnvironmentVariablesProvider) => {
        return {
          global: true,
          secret: env.application.authToken,
        };
      },
    }),
    UserModule,
    MailModule,
    forwardRef(() => CurrencyExchangeModule),
  ],
  controllers: [...AuthControllers],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard, UserModule],
})
export class AuthModule {}
