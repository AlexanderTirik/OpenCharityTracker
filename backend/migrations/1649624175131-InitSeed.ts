import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';

export class InitSeed1649624175131 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const file = fs.readFileSync('./account.json', 'utf-8');
    await queryRunner.query(`INSERT INTO "Blockchain" (blockchain_id, blockchain_key)
            VALUES ('e871be3c-b49d-47c8-9c70-61efaa701c9f', '${JSON.stringify(
              JSON.parse(file),
            )}');`);

    await queryRunner.query(`INSERT INTO "Project" (project_id, project_name, project_description, blockchain_id)
            VALUES ('f3e4c107-225e-42f6-a20c-8db51c1213ae','First project', 'awesome description', 'e871be3c-b49d-47c8-9c70-61efaa701c9f');
    `);

    await queryRunner.query(`INSERT INTO "Card" (issuer_specific_data, card_number, card_provider, project_id)
        VALUES ('{"accountId": "s6eRUl8CdEowIo2CF3VyEA"}', '5375411500638221', 'Monobank', 'f3e4c107-225e-42f6-a20c-8db51c1213ae');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
