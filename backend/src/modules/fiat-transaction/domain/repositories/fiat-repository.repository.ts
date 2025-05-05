import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { EnvironmentVariablesProvider } from '@core/enviroment-variables/providers/enviroment-variables.provider';
import { BaseRepository } from '@core/database/domain/repositories/base.repository';
import { FiatTransactionEntity } from '../entities/fiat-transaction.entity';

@Injectable()
export class FiatTransactionRepository extends BaseRepository<FiatTransactionEntity> {
  public constructor(
    @InjectRepository(FiatTransactionEntity)
    repository: Repository<FiatTransactionEntity>,
    env: EnvironmentVariablesProvider,
  ) {
    super(repository, env);
  }
}
