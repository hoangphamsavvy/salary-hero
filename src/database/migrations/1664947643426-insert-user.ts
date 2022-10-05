import { MigrationInterface, QueryRunner } from 'typeorm';

export class createLeaveFindPeriod1664947643426 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users(email, role) VALUES ('admin@gmail.com', 'SUPER_ADMIN')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // TODO
  }
}
