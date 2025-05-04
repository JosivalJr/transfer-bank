import { HttpException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ILike, QueryRunner } from 'typeorm';

import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { CreateUserDTO } from '@modules/user/domain/dtos/create-user.dto';
import { PasswordHelper } from '@modules/user/domain/helpers/password.helper';
import { UserRepository } from '@modules/user/domain/repositories/user.repository';

type CreateUserParams = {
  data: CreateUserDTO;
  queryRunner?: QueryRunner;
};

export class CreateAccountProvider {
  public constructor(private readonly userRepository: UserRepository) {}

  public async execute({
    data,
    queryRunner,
  }: CreateUserParams): Promise<UserEntity> {
    await this.validateUserEmail(data.email);

    if (queryRunner) {
      return await this.saveUserWithTransaction(data, queryRunner);
    }

    return await this.userRepository.transaction(async (query) => {
      return await this.saveUserWithTransaction(data, query);
    });
  }

  private async validateUserEmail(email: string): Promise<void> {
    const user = await this.userRepository.manager.findOne({
      where: { email: ILike(email) },
      withDeleted: true,
    });

    if (user) {
      if (user.deletedAt)
        throw new HttpException(
          'Email already used by a user partially removed from the system. To use this email, please contact support.',
          412,
        );
      throw new HttpException(
        'There is already a registered user with the email address provided',
        412,
      );
    }
  }

  private async saveUserWithTransaction(
    data: CreateUserDTO,
    query: QueryRunner,
  ) {
    const user = await query.manager.save(
      UserEntity,
      await this.serializeData(data),
    );

    return user;
  }

  private async serializeData(data: CreateUserDTO) {
    data.password = PasswordHelper.hashSync(data.password);

    const user = plainToInstance(UserEntity, data, { ignoreDecorators: true });

    return user;
  }
}
