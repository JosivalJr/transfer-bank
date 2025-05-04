import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from './domain/repositories/user.repository';
import { UserEntity } from './domain/entities/user.entity';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository, UserService],
  controllers: [],
  exports: [UserRepository],
})
export class UserModule {}
