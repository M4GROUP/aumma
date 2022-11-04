import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667577266197 implements MigrationInterface {
    name = 'createTables1667577266197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`ALTER TABLE "mother" DROP CONSTRAINT "FK_33f578cb92a23e39414c85aeece"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_54c123b7262e08a2e4577f502be"`);
        await queryRunner.query(`ALTER TABLE "childrens" DROP CONSTRAINT "FK_ddc197aa56604ce35f2b3bdf2ac"`);
        await queryRunner.query(`ALTER TABLE "mother" DROP COLUMN "institutionsMotherId"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "motherId"`);
        await queryRunner.query(`ALTER TABLE "childrens" DROP COLUMN "institutionId"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "name" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "idChildren" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "idInstitution" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "childrensId" uuid`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_20d049a20e2f1972040a589d34f" FOREIGN KEY ("childrensId") REFERENCES "childrens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_20d049a20e2f1972040a589d34f"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "childrensId"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "idInstitution"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "idChildren"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "childrens" ADD "institutionId" uuid`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "motherId" uuid`);
        await queryRunner.query(`ALTER TABLE "mother" ADD "institutionsMotherId" uuid`);
        await queryRunner.query(`ALTER TABLE "childrens" ADD CONSTRAINT "FK_ddc197aa56604ce35f2b3bdf2ac" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_54c123b7262e08a2e4577f502be" FOREIGN KEY ("motherId") REFERENCES "mother"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mother" ADD CONSTRAINT "FK_33f578cb92a23e39414c85aeece" FOREIGN KEY ("institutionsMotherId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
