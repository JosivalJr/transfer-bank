import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFiatTransactionTable1746403174097
  implements MigrationInterface
{
  name = 'CreateFiatTransactionTable1746403174097';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."fiat-transactions_type_enum" AS ENUM('DEPOSIT', 'WITHDRAW', 'TRANSFER_IN', 'TRANSFER_OUT')`,
    );
    await queryRunner.query(
      `CREATE TABLE "fiat-transactions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "type" "public"."fiat-transactions_type_enum" NOT NULL, "amount" numeric(18,2) NOT NULL DEFAULT '0', "currency_id" integer, "sender_wallet_id" integer, "recipient_wallet_id" integer, CONSTRAINT "PK_dbde69192a8faa1a159813e70d1" PRIMARY KEY ("id")); COMMENT ON COLUMN "fiat-transactions"."id" IS 'Record identification code'; COMMENT ON COLUMN "fiat-transactions"."created_at" IS 'Record creation date'; COMMENT ON COLUMN "fiat-transactions"."updated_at" IS 'Record edition date'; COMMENT ON COLUMN "fiat-transactions"."deleted_at" IS 'Record deletion date'; COMMENT ON COLUMN "fiat-transactions"."type" IS 'Transaction type'; COMMENT ON COLUMN "fiat-transactions"."amount" IS 'Transaction amount'; COMMENT ON COLUMN "fiat-transactions"."currency_id" IS 'Record identification code'; COMMENT ON COLUMN "fiat-transactions"."sender_wallet_id" IS 'Record identification code'; COMMENT ON COLUMN "fiat-transactions"."recipient_wallet_id" IS 'Record identification code'`,
    );
    await queryRunner.query(
      `COMMENT ON TABLE "fiat-transactions" IS 'Table to store fiat transactions data'`,
    );
    await queryRunner.query(
      `ALTER TABLE "fiat-transactions" ADD CONSTRAINT "FK_c626ea5e805bb187a7015a4c7f6" FOREIGN KEY ("currency_id") REFERENCES "currency-exchanges"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fiat-transactions" ADD CONSTRAINT "FK_7c93445197a53a380d2fc69ea77" FOREIGN KEY ("sender_wallet_id") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fiat-transactions" ADD CONSTRAINT "FK_80c0d6c6f556613d51aae266686" FOREIGN KEY ("recipient_wallet_id") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fiat-transactions" DROP CONSTRAINT "FK_80c0d6c6f556613d51aae266686"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fiat-transactions" DROP CONSTRAINT "FK_7c93445197a53a380d2fc69ea77"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fiat-transactions" DROP CONSTRAINT "FK_c626ea5e805bb187a7015a4c7f6"`,
    );
    await queryRunner.query(`COMMENT ON TABLE "fiat-transactions" IS NULL`);
    await queryRunner.query(`DROP TABLE "fiat-transactions"`);
    await queryRunner.query(`DROP TYPE "public"."fiat-transactions_type_enum"`);
  }
}
