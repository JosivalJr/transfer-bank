import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { EnvironmentVariablesProvider } from '@core/enviroment-variables/providers/enviroment-variables.provider';
import { BaseRepository } from '@core/database/domain/repositories/base.repository';
import { WalletEntity } from '../entities/wallet.entity';

@Injectable()
export class WalletRepository extends BaseRepository<WalletEntity> {
  public constructor(
    @InjectRepository(WalletEntity)
    repository: Repository<WalletEntity>,
    env: EnvironmentVariablesProvider,
  ) {
    super(repository, env);
  }
}
