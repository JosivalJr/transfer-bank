import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from './domain/repositories/user.repository';
import { UserEntity } from './domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository],
  controllers: [],
  exports: [UserRepository],
})
export class UserModule {}
