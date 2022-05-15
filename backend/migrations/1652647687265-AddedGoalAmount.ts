import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedGoalAmount1652647687265 implements MigrationInterface {
  name = 'AddedGoalAmount1652647687265';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Project" ADD "goal" numeric NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "Project" ADD "collectedAmount" numeric NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Project" DROP COLUMN "collectedAmount"`,
    );
    await queryRunner.query(`ALTER TABLE "Project" DROP COLUMN "goal"`);
  }
}
