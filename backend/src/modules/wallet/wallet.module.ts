import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './domain/entities/wallet.entity';
import { WalletService } from './services/wallet.service';
import { WalletRepository } from './domain/repositories/wallet.repository';
import { WalletControllers } from './controllers/wallet.controller';
import { CurrencyExchangeModule } from '@modules/currency-exchange/currency-exchange.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WalletEntity]),
    forwardRef(() => CurrencyExchangeModule),
  ],
  providers: [WalletRepository, WalletService],
  exports: [WalletRepository, WalletService],
  controllers: [...WalletControllers],
})
export class WalletModule {}
