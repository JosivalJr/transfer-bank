import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';

import { EnvironmentVariablesModule } from '@core/enviroment-variables/enviroment-variables.module';
import { EnvironmentVariablesProvider } from '@core/enviroment-variables/providers/enviroment-variables.provider';

import { DatabaseConnection } from './domain/connection/database.connection';
import { DatabaseDictionaryService } from './services/database-dictionary.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentVariablesModule],
      inject: [EnvironmentVariablesProvider],
      useFactory: async (env: EnvironmentVariablesProvider) => {
        const connection = new DatabaseConnection(env);
        return connection.getConnection();
      },
    }),
  ],
  // providers: [DatabaseDictionaryService],
  providers: [],
})
export class DatabaseModule {}
