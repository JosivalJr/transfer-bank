import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyExchangeEntity } from './domain/entities/currency-exchange.entity';
import { CurrencyExchangeService } from './services/currency-exchange.service';
import { CurrencyExchangeControllers } from './controllers/currency-exchange.controller';
import { CurrencyExchangeRepository } from './domain/repositories/currency-exchange.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CurrencyExchangeEntity])],
  providers: [CurrencyExchangeRepository, CurrencyExchangeService],
  exports: [CurrencyExchangeRepository, CurrencyExchangeService],
  controllers: [...CurrencyExchangeControllers],
})
export default class CurrencyExchangeModule {}
