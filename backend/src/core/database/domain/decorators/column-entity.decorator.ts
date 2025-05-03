import {
  Column,
  ColumnOptions,
  PrimaryColumn,
  PrimaryColumnOptions,
} from 'typeorm';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Defining the connection of a database column to/with the system entity
 * @param options Entity Options
 * @returns Decorators performing Column configuration in the entity
 */
export function ColumnEntity(
  options: Exclude<ColumnOptions, 'comment'> & {
    example?: any;
    format?: string;
    description: string;
  },
) {
  if (options.nullable) {
    return applyDecorators(
      Column({ ...options, comment: options.description }),
      ApiPropertyOptional({
        ...options,
        name: undefined,
        type: undefined,
        maxLength: parseInt(`${options.length}`),
      }),
    );
  }
  return applyDecorators(
    Column({ ...options, comment: options.description }),
    ApiProperty({
      ...options,
      type: undefined,
      name: undefined,
      maxLength: parseInt(`${options.length}`),
    }),
  );
}

export function PrimaryColumnEntity(
  options: Exclude<PrimaryColumnOptions, 'comment' | 'nullable'> & {
    example?: any;
    format?: string;
    description: string;
  },
) {
  return applyDecorators(
    PrimaryColumn({ ...options, comment: options.description }),
    ApiProperty({
      ...options,
      type: undefined,
      maxLength: parseInt(`${options.length}`),
    }),
  );
}
