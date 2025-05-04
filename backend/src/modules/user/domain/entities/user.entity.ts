import { Exclude } from 'class-transformer';

import { BaseEntity } from '@core/database/domain/entities/base.entity';
import { EntityTable } from '@core/database/domain/decorators/table-entity.decorator';
import { ColumnEntity } from '@core/database/domain/decorators/column-entity.decorator';

@EntityTable('users', 'Table to store user data')
export class UserEntity extends BaseEntity {
  @ColumnEntity({
    name: 'name',
    type: 'varchar',
    length: 50,
    example: 'John Doe',
    description: 'Username',
  })
  public name: string;

  @ColumnEntity({
    name: 'email',
    type: 'varchar',
    length: 256,
    unique: true,
    example: 'john.doe@email.com',
    description: 'User email address',
  })
  public email: string;

  @ColumnEntity({
    name: 'cpf',
    type: 'varchar',
    length: 11,
    example: '000.000.000-00',
    description: 'User CPF',
  })
  public cpf: string;

  @Exclude()
  @ColumnEntity({
    name: 'password',
    type: 'varchar',
    length: 200,
    select: false,
    description: 'User encrypted password',
  })
  public password: string;

  @ColumnEntity({
    name: 'reset_password',
    type: 'boolean',
    description:
      'Informs whether the user will need to change the password the next time they access it',
    default: false,
  })
  public resetPassword: boolean;
}
