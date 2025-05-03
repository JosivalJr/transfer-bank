import {
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  ObjectType,
  OneToMany,
  RelationOptions,
} from 'typeorm';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from '../entities/base.entity';

interface IManyToMany<T extends BaseEntity> {
  description: string;
  entityRelation: ObjectType<T>;
  join: { tableName: string; columnName: string; relationColumnName: string };
  relationOptions?: RelationOptions;
}

interface IOneToMany<T extends BaseEntity> {
  description: string;
  entityRelation: ObjectType<T>;
  columnName: string;
}

interface IManyToOne<T extends BaseEntity> {
  description: string;
  entityRelation: ObjectType<T>;
  relationColumnName: keyof T;
  options?: RelationOptions;
}

export function ManyToManyTest<T extends BaseEntity>({
  description,
  entityRelation,
  join,
  relationOptions,
}: IManyToMany<T>) {
  return applyDecorators(
    ApiProperty({
      description: description,
      isArray: true,
      type: entityRelation,
    }),
    ManyToMany(() => entityRelation, relationOptions),
    JoinTable({
      name: join.tableName,
      joinColumns: [{ name: join.columnName }],
      inverseJoinColumns: [{ name: join.relationColumnName }],
    }),
  );
}

/**
 * Defining relationships in entities for FKS connection
 */
export class RelationsEntity {
  /**
   * Many-to-many relationship, in this relationship a table is created to carry out the relationship in the proper way
   * @param options Options for configuring this entity
   * @returns Decorators setting this relationship in the entity
   */
  public static manyToMany<T extends BaseEntity>({
    description,
    entityRelation,
    join,
    relationOptions,
  }: IManyToMany<T>) {
    return applyDecorators(
      ApiProperty({
        description: description,
        isArray: true,
        type: entityRelation,
      }),
      ManyToMany(() => entityRelation, relationOptions),
      JoinTable({
        name: join.tableName,
        joinColumns: [{ name: join.columnName }],
        inverseJoinColumns: [{ name: join.relationColumnName }],
      }),
    );
  }

  /**
   * One to Many Relationship, a new column will be created in the respective table so that the relationship can be made correctly
   * @param options Options for configuring this entity
   * @returns Decorators setting this relationship in the entity
   */
  public static oneToMany<T extends BaseEntity>({
    description,
    entityRelation,
    columnName,
  }: IOneToMany<T>) {
    return applyDecorators(
      ApiProperty({ description: description, type: entityRelation }),
      ManyToOne(() => entityRelation),
      JoinColumn({ name: columnName, referencedColumnName: 'id' }),
    );
  }

  /**
   * Many-to-one relationship, will be connected with the relationship in another entity
   * @param options Options for configuring this connection
   * @returns Decorators setting this relationship in the entity
   */
  public static manyToOne<T extends BaseEntity>({
    description,
    entityRelation,
    relationColumnName,
  }: IManyToOne<T>) {
    return applyDecorators(
      ApiProperty({
        description: description,
        isArray: true,
        type: entityRelation,
        required: false,
      }),
      OneToMany(
        () => entityRelation,
        (entityData) => entityData[relationColumnName],
        {
          cascade: true,
        },
      ),
    );
  }
}
