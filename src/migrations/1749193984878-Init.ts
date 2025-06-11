import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1749193984878 implements MigrationInterface {
    name = 'Init1749193984878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "kroger_token" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "expiresAt" integer NOT NULL, CONSTRAINT "PK_caf3b011158bf72e81a7fe77cce" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "kroger_token"`);
    }

}
