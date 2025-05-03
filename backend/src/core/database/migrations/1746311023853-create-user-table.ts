import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1746311023853 implements MigrationInterface {
  name = 'CreateUserTable1746311023853';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "name" character varying(50) NOT NULL, "email" character varying(256) NOT NULL, "password" character varying(200) NOT NULL, "reset_password" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."id" IS 'Record identification code'; COMMENT ON COLUMN "users"."created_at" IS 'Record creation date'; COMMENT ON COLUMN "users"."updated_at" IS 'Record edition date'; COMMENT ON COLUMN "users"."deleted_at" IS 'Record deletion date'; COMMENT ON COLUMN "users"."name" IS 'Username'; COMMENT ON COLUMN "users"."email" IS 'User email address'; COMMENT ON COLUMN "users"."password" IS 'User encrypted password'; COMMENT ON COLUMN "users"."reset_password" IS 'Informs whether the user will need to change the password the next time they access it'`,
    );
    await queryRunner.query(
      `COMMENT ON TABLE "users" IS 'Table to store user data'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON TABLE "users" IS NULL`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
