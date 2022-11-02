import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667350179353 implements MigrationInterface {
    name = 'createTables1667350179353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "institution" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "institution" DROP COLUMN "isActive"`);
    }

}
