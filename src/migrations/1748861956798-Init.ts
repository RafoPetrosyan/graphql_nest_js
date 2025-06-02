import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1748861956798 implements MigrationInterface {
    name = 'Init1748861956798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    }

}
