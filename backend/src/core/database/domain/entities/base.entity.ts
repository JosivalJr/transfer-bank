import {
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export abstract class BaseEntity {
  @ApiProperty({ description: 'Record identification code' })
  @PrimaryGeneratedColumn({ comment: 'Record identification code' })
  public id: number;

  @ApiProperty({ description: 'Record creation date' })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    comment: 'Record creation date',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @Exclude()
  @ApiProperty({ description: 'Record edition date' })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    comment: 'Record edition date',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @Exclude()
  @ApiProperty({ description: 'Record deletion date' })
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    comment: 'Record deletion date',
  })
  public deletedAt?: Date;
}
