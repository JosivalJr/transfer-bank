import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWalletTable1746403095145 implements MigrationInterface {
  name = 'CreateWalletTable1746403095145';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "currency-exchanges" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "symbol" character varying(3) NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_40b1dcc8d31e10cc1a0e9cc4380" PRIMARY KEY ("id")); COMMENT ON COLUMN "currency-exchanges"."id" IS 'Record identification code'; COMMENT ON COLUMN "currency-exchanges"."created_at" IS 'Record creation date'; COMMENT ON COLUMN "currency-exchanges"."updated_at" IS 'Record edition date'; COMMENT ON COLUMN "currency-exchanges"."deleted_at" IS 'Record deletion date'; COMMENT ON COLUMN "currency-exchanges"."symbol" IS 'Currency exchange symbol'; COMMENT ON COLUMN "currency-exchanges"."name" IS 'Currency exchange name'`,
    );
    await queryRunner.query(
      `COMMENT ON TABLE "currency-exchanges" IS 'Table to store currency exchanges'`,
    );
    await queryRunner.query(
      `CREATE TABLE "wallets" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "balance" numeric(18,2) NOT NULL DEFAULT '0', "user_id" integer, "currency_id" integer, CONSTRAINT "REL_92558c08091598f7a4439586cd" UNIQUE ("user_id"), CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id")); COMMENT ON COLUMN "wallets"."id" IS 'Record identification code'; COMMENT ON COLUMN "wallets"."created_at" IS 'Record creation date'; COMMENT ON COLUMN "wallets"."updated_at" IS 'Record edition date'; COMMENT ON COLUMN "wallets"."deleted_at" IS 'Record deletion date'; COMMENT ON COLUMN "wallets"."balance" IS 'Wallet balance'; COMMENT ON COLUMN "wallets"."user_id" IS 'Record identification code'; COMMENT ON COLUMN "wallets"."currency_id" IS 'Record identification code'`,
    );
    await queryRunner.query(
      `COMMENT ON TABLE "wallets" IS 'Table to store wallet data'`,
    );
    await queryRunner.query(
      `ALTER TABLE "wallets" ADD CONSTRAINT "FK_92558c08091598f7a4439586cda" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "wallets" ADD CONSTRAINT "FK_b3167c57663ae949d67436465b3" FOREIGN KEY ("currency_id") REFERENCES "currency-exchanges"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wallets" DROP CONSTRAINT "FK_b3167c57663ae949d67436465b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "wallets" DROP CONSTRAINT "FK_92558c08091598f7a4439586cda"`,
    );
    await queryRunner.query(`COMMENT ON TABLE "wallets" IS NULL`);
    await queryRunner.query(`DROP TABLE "wallets"`);
    await queryRunner.query(`COMMENT ON TABLE "currency-exchanges" IS NULL`);
    await queryRunner.query(`DROP TABLE "currency-exchanges"`);
  }
}
