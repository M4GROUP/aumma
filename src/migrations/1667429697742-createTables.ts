import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667429697742 implements MigrationInterface {
    name = 'createTables1667429697742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "schedules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "isActive" boolean NOT NULL, "period" character varying NOT NULL, "institutionId" uuid, "motherId" uuid, "adminId" uuid, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "institution" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "password" character varying(128) NOT NULL, "address" character varying(240) NOT NULL, "cnpj" character varying(128) NOT NULL, "ageGroup" integer NOT NULL, "phone" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "email" character varying(128) NOT NULL, "PCDAccept" boolean NOT NULL, "adminId" uuid, CONSTRAINT "UQ_c9af99711dccbeb22b20b24cca8" UNIQUE ("cnpj"), CONSTRAINT "UQ_43c747addb41aeac8b1da0c58d5" UNIQUE ("email"), CONSTRAINT "PK_f60ee4ff0719b7df54830b39087" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mother" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "address" character varying(240) NOT NULL, "phone" integer NOT NULL, "email" character varying(128) NOT NULL, "password" character varying(128) NOT NULL, "cpf" character varying(128) NOT NULL, "rg" character varying(128) NOT NULL, "isActive" boolean NOT NULL, "institutionsMotherId" uuid, "adminId" uuid, CONSTRAINT "UQ_6d38c477457191cc30f8893ef3f" UNIQUE ("email"), CONSTRAINT "UQ_11cbb4f6221485ed08966d1f95b" UNIQUE ("cpf"), CONSTRAINT "UQ_eeaf53b301b5d284acd10f7f6c5" UNIQUE ("rg"), CONSTRAINT "PK_d429afd0d4f97003ac3f49fc885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "childrens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "age" integer NOT NULL, "isPCD" boolean NOT NULL, "genre" character varying NOT NULL, "motherId" uuid, "institutionId" uuid, "adminId" uuid, CONSTRAINT "PK_eb3e2ac0d5a630ac664ff3b3651" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "password" character varying(128) NOT NULL, "email" character varying(128) NOT NULL, "isAdm" boolean NOT NULL, CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_ffd616289fa4da2c6463f12093d" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_54c123b7262e08a2e4577f502be" FOREIGN KEY ("motherId") REFERENCES "mother"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_5966fc2495a06fc4f34f6459ee3" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "institution" ADD CONSTRAINT "FK_c818a4fb122f2e1cfe887bcada1" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mother" ADD CONSTRAINT "FK_33f578cb92a23e39414c85aeece" FOREIGN KEY ("institutionsMotherId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mother" ADD CONSTRAINT "FK_a0e979b8622d0056dfd5f9ac4be" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "childrens" ADD CONSTRAINT "FK_912da9d8363ca75331a7e7f59d4" FOREIGN KEY ("motherId") REFERENCES "mother"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "childrens" ADD CONSTRAINT "FK_ddc197aa56604ce35f2b3bdf2ac" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "childrens" ADD CONSTRAINT "FK_7023091c22ca1167c194bb574e0" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "childrens" DROP CONSTRAINT "FK_7023091c22ca1167c194bb574e0"`);
        await queryRunner.query(`ALTER TABLE "childrens" DROP CONSTRAINT "FK_ddc197aa56604ce35f2b3bdf2ac"`);
        await queryRunner.query(`ALTER TABLE "childrens" DROP CONSTRAINT "FK_912da9d8363ca75331a7e7f59d4"`);
        await queryRunner.query(`ALTER TABLE "mother" DROP CONSTRAINT "FK_a0e979b8622d0056dfd5f9ac4be"`);
        await queryRunner.query(`ALTER TABLE "mother" DROP CONSTRAINT "FK_33f578cb92a23e39414c85aeece"`);
        await queryRunner.query(`ALTER TABLE "institution" DROP CONSTRAINT "FK_c818a4fb122f2e1cfe887bcada1"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_5966fc2495a06fc4f34f6459ee3"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_54c123b7262e08a2e4577f502be"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_ffd616289fa4da2c6463f12093d"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "childrens"`);
        await queryRunner.query(`DROP TABLE "mother"`);
        await queryRunner.query(`DROP TABLE "institution"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
    }

}
