import { HttpException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ILike, QueryRunner } from 'typeorm';

import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { CreateUserDTO } from '@modules/user/domain/dtos/create-user.dto';
import { PasswordHelper } from '@modules/user/domain/helpers/password.helper';
import { UserRepository } from '@modules/user/domain/repositories/user.repository';

export class CreateUserProvider {
  public constructor(private readonly userRepository: UserRepository) {}

  public async execute({
    dto,
    queryRunner,
  }: {
    dto: CreateUserDTO;
    authUser?: UserEntity;
    queryRunner?: QueryRunner;
  }): Promise<UserEntity> {
    await this.validateUserEmail(dto.email);

    if (queryRunner) {
      return await this.saveUserWithTransaction(dto, queryRunner);
    }

    return await this.userRepository.transaction(async (query) => {
      return await this.saveUserWithTransaction(dto, query);
    });
  }

  private async validateUserEmail(email: string): Promise<void> {
    const user = await this.userRepository.manager.findOne({
      where: { email: ILike(email) },
    });

    if (user) {
      throw new HttpException(
        'There is already a registered user with the email address provided',
        412,
      );
    }
  }

  private async saveUserWithTransaction(
    dto: CreateUserDTO,
    query: QueryRunner,
  ) {
    const user = await query.manager.save(
      UserEntity,
      await this.serialize(dto),
    );

    return user;
  }

  private async serialize(dto: CreateUserDTO) {
    const password = PasswordHelper.hashSync(dto.password);

    const user = plainToInstance(
      UserEntity,
      {
        ...dto,
        password,
      },
      { ignoreDecorators: true },
    );

    return user;
  }
}
