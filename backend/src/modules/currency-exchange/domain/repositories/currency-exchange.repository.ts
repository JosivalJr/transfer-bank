import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { EnvironmentVariablesProvider } from '@core/enviroment-variables/providers/enviroment-variables.provider';
import { BaseRepository } from '@core/database/domain/repositories/base.repository';
import { CurrencyExchangeEntity } from '../entities/currency-exchange.entity';

@Injectable()
export class CurrencyExchangeRepository extends BaseRepository<CurrencyExchangeEntity> {
  public constructor(
    @InjectRepository(CurrencyExchangeEntity)
    repository: Repository<CurrencyExchangeEntity>,
    env: EnvironmentVariablesProvider,
  ) {
    super(repository, env);
  }
}
