import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FiatTransactionEntity } from './domain/entities/fiat-transaction.entity';
import { FiatTransactionService } from './services/fiat-transaction.service';
import { FiatTransactionRepository } from './domain/repositories/fiat-repository.repository';
import { FiatTransactionControllers } from './controllers/fiat-transaction.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FiatTransactionEntity])],
  providers: [FiatTransactionRepository, FiatTransactionService],
  exports: [FiatTransactionRepository, FiatTransactionService],
  controllers: [...FiatTransactionControllers],
})
export default class FiatTransactionModule {}
