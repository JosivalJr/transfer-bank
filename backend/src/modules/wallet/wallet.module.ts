import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './domain/entities/wallet.entity';
import { WalletService } from './services/wallet.service';
import { WalletRepository } from './domain/repositories/wallet.repository';
import { WalletControllers } from './controllers/wallet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WalletEntity])],
  providers: [WalletRepository, WalletService],
  exports: [WalletRepository, WalletService],
  controllers: [...WalletControllers],
})
export default class WalletModule {}
