import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCPFColumnToUser1746377909981 implements MigrationInterface {
  name = 'AddCPFColumnToUser1746377909981';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "cpf" character varying(11) NOT NULL`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "users"."cpf" IS 'User CPF'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "users"."cpf" IS 'User CPF'`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cpf"`);
  }
}
