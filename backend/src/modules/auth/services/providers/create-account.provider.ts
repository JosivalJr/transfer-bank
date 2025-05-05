// import { HttpException } from '@nestjs/common';
// import { plainToInstance } from 'class-transformer';
// import { ILike, QueryRunner } from 'typeorm';

// import { UserEntity } from '@modules/user/domain/entities/user.entity';
// import { CreateUserDTO } from '@modules/user/domain/dtos/create-user.dto';
// import { PasswordHelper } from '@modules/user/domain/helpers/password.helper';
// import { UserRepository } from '@modules/user/domain/repositories/user.repository';

// type CreateUserParams = {
//   data: CreateUserDTO;
// };

// export class CreateAccountProvider {
//   public constructor(private readonly userRepository: UserRepository) {}

//   public async execute({ data }: CreateUserParams): Promise<UserEntity> {
//     await this.validateUserEmail(data.email);

//     return await this.userRepository.transaction(async (query) => {
//       return await this.saveUserWithTransaction(data, query);
//     });
//   }

//   private async validateUserEmail(email: string): Promise<void> {
//     const user = await this.userRepository.manager.findOne({
//       where: { email: ILike(email) },
//       withDeleted: true,
//     });

//     if (user) {
//       if (user.deletedAt)
//         throw new HttpException(
//           'Email already used by a user partially removed from the system. To use this email, please contact support.',
//           412,
//         );
//       throw new HttpException(
//         'There is already a registered user with the email address provided',
//         412,
//       );
//     }
//   }

//   private async saveUserWithTransaction(
//     data: CreateUserDTO,
//     query: QueryRunner,
//   ) {
//     const user = await query.manager.save(
//       UserEntity,
//       await this.serializeData(data),
//     );

//     return user;
//   }

//   private async serializeData(data: CreateUserDTO) {
//     data.password = PasswordHelper.hashSync(data.password);

//     const user = plainToInstance(UserEntity, data, { ignoreDecorators: true });

//     return user;
//   }
// }

import { HttpException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ILike, QueryRunner } from 'typeorm';

import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { CreateUserDTO } from '@modules/user/domain/dtos/create-user.dto';
import { PasswordHelper } from '@modules/user/domain/helpers/password.helper';
import { UserRepository } from '@modules/user/domain/repositories/user.repository';
import { WalletEntity } from '@modules/wallet/domain/entities/wallet.entity';
import { CurrencyExchangeEntity } from '@modules/currency-exchange/domain/entities/currency-exchange.entity';
import { CurrencyExchangeRepository } from '@modules/currency-exchange/domain/repositories/currency-exchange.repository';

import { Logger } from '@nestjs/common';

const logger = new Logger('CreateAccountProvider');

type CreateUserParams = {
  dto: CreateUserDTO;
};

export class CreateAccountProvider {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly currencyExchangeRepository: CurrencyExchangeRepository,
  ) {}

  public async execute({ dto }: CreateUserParams): Promise<UserEntity> {
    await this.validateUserEmail(dto.email);

    logger.log({ dto });

    const currencyExchange = await this.getCurrencyExchange();
    logger.log({ currencyExchange });
    return await this.userRepository.transaction(async (query) => {
      return await this.saveUserAndWallet(dto, currencyExchange, query);
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

  private async getCurrencyExchange(): Promise<CurrencyExchangeEntity> {
    const currencyExchange =
      await this.currencyExchangeRepository.manager.findOne({
        where: { symbol: 'USD' },
      });

    if (!currencyExchange)
      throw new HttpException(
        'We were unable to register your account due to the exchange system being unavailable.',
        412,
      );

    return currencyExchange;
  }

  private async saveUserAndWallet(
    data: CreateUserDTO,
    currency: CurrencyExchangeEntity,
    query: QueryRunner,
  ): Promise<UserEntity> {
    logger.log('ENTROU AQUI', { data, currency, query });
    const user = await query.manager.save(
      UserEntity,
      await this.serializeUserData(data),
    );

    logger.log({ user });

    const wallet = plainToInstance(
      WalletEntity,
      {
        user,
        currency,
        balance: 0,
      },
      { ignoreDecorators: true },
    );

    logger.log({ wallet });

    const result = await query.manager.save(WalletEntity, wallet);
    logger.log({ result });
    return user;
  }

  private async serializeUserData(data: CreateUserDTO) {
    data.password = PasswordHelper.hashSync(data.password);

    return plainToInstance(UserEntity, data, { ignoreDecorators: true });
  }
}
