import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyExchangeEntity } from './domain/entities/currency-exchange.entity';
import { CurrencyExchangeService } from './services/currency-exchange.service';
import { CurrencyExchangeControllers } from './controllers/currency-exchange.controller';
import { CurrencyExchangeRepository } from './domain/repositories/currency-exchange.repository';
import { WalletModule } from '@modules/wallet/wallet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CurrencyExchangeEntity]),
    forwardRef(() => WalletModule),
  ],
  providers: [CurrencyExchangeRepository, CurrencyExchangeService],
  exports: [CurrencyExchangeRepository, CurrencyExchangeService],
  controllers: [...CurrencyExchangeControllers],
})
export class CurrencyExchangeModule {}
