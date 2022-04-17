import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1649624123056 implements MigrationInterface {
  name = 'Init1649624123056';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Blockchain" ("blockchain_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "blockchain_key" json NOT NULL, "blockchain_description" text, CONSTRAINT "PK_5178047a76104037ced9f1939fc" PRIMARY KEY ("blockchain_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Project" ("project_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "project_name" text, "project_description" text, "blockchain_id" uuid NOT NULL, CONSTRAINT "REL_d41d6f80e45bc4a8632f41ce38" UNIQUE ("blockchain_id"), CONSTRAINT "PK_5c8507b181bdc91c393299ee2d2" PRIMARY KEY ("project_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Card" ("card_entity_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "issuer_specific_data" json NOT NULL, "card_number" character varying NOT NULL, "card_provider" character varying NOT NULL, "project_id" uuid NOT NULL, CONSTRAINT "PK_4ce471d53d8a7ffee9992ef4ddd" PRIMARY KEY ("card_entity_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "Project" ADD CONSTRAINT "FK_d41d6f80e45bc4a8632f41ce386" FOREIGN KEY ("blockchain_id") REFERENCES "Blockchain"("blockchain_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Card" ADD CONSTRAINT "FK_67ee27c76c6b0b7d30d38f0b67f" FOREIGN KEY ("project_id") REFERENCES "Project"("project_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Card" DROP CONSTRAINT "FK_67ee27c76c6b0b7d30d38f0b67f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Project" DROP CONSTRAINT "FK_d41d6f80e45bc4a8632f41ce386"`,
    );
    await queryRunner.query(`DROP TABLE "Card"`);
    await queryRunner.query(`DROP TABLE "Project"`);
    await queryRunner.query(`DROP TABLE "Blockchain"`);
  }
}
