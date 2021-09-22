import {MigrationInterface, QueryRunner} from "typeorm";

export class init1632298576611 implements MigrationInterface {
    name = 'init1632298576611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ministry_info" ("id" SERIAL NOT NULL, "ministry" character varying(50) NOT NULL, "tone" character varying(5) NOT NULL, "lastPlayed" date, "timesPlayed" integer NOT NULL DEFAULT '0', "musicId" integer, CONSTRAINT "PK_8a5f80354026046e0393b3a32fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "music" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "author" character varying(100) NOT NULL, "gender" character varying(50) NOT NULL, "linkCifra" text, "linkYoutube" text, CONSTRAINT "PK_c92b010dd889692dd54286f75e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "ministry" character varying(50) NOT NULL, "date" date NOT NULL, "played" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event_musics_music" ("eventId" integer NOT NULL, "musicId" integer NOT NULL, CONSTRAINT "PK_6583f6e3265fb3916a454b1ce50" PRIMARY KEY ("eventId", "musicId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b04cb1eb1e8f6201fd7c768020" ON "event_musics_music" ("eventId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b0d4414d8df391a7b497efaca9" ON "event_musics_music" ("musicId") `);
        await queryRunner.query(`ALTER TABLE "ministry_info" ADD CONSTRAINT "FK_edda510877c6b783f25e0b0a097" FOREIGN KEY ("musicId") REFERENCES "music"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_musics_music" ADD CONSTRAINT "FK_b04cb1eb1e8f6201fd7c768020e" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "event_musics_music" ADD CONSTRAINT "FK_b0d4414d8df391a7b497efaca95" FOREIGN KEY ("musicId") REFERENCES "music"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_musics_music" DROP CONSTRAINT "FK_b0d4414d8df391a7b497efaca95"`);
        await queryRunner.query(`ALTER TABLE "event_musics_music" DROP CONSTRAINT "FK_b04cb1eb1e8f6201fd7c768020e"`);
        await queryRunner.query(`ALTER TABLE "ministry_info" DROP CONSTRAINT "FK_edda510877c6b783f25e0b0a097"`);
        await queryRunner.query(`DROP INDEX "IDX_b0d4414d8df391a7b497efaca9"`);
        await queryRunner.query(`DROP INDEX "IDX_b04cb1eb1e8f6201fd7c768020"`);
        await queryRunner.query(`DROP TABLE "event_musics_music"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "music"`);
        await queryRunner.query(`DROP TABLE "ministry_info"`);
    }

}
