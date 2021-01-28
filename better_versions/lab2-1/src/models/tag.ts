const pool = require('../db.js');
import { question } from 'readline-sync';

import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';
import { Tags } from '../types.js';

export class TagModel {
    static async addDataTag() {
        try {
            const newTag: Tags = Reader.prepareDataTag();
            const text: string = 'INSERT INTO "Tags" ("tName", "description") VALUES($1, $2)';

            await pool.query(text, [newTag.tName, newTag.description]);

            console.log('Added 1 row to table Tags');
        } catch (err) {
            console.log(err);
        }
    }

    static async editDataTag() {
        try {
            const id: number = +question('tag id: ');
            const updateTag: Tags = Reader.prepareDataTag();
            const text: string = 'UPDATE "Tags" SET "tName" = $1, "description" = $2 WHERE "tagId" = $3';
            const check = await pool.query('SELECT * FROM "Tags" WHERE "tagId" = $1', [id]);

            if (!check.rows.length) {
                console.log(`There is no tag with id ${id} in database`);
            } else {
                await pool.query(text, [updateTag.tName, updateTag.description, id]);

                console.log(`Record with id ${id} has been updated`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteDataTag() {
        try {
            const id: number = +question('tag id: ');
            const text: string = 'DELETE FROM "Tags" WHERE "tagId" = $1';
            const check = await pool.query('SELECT * FROM "Tags" WHERE "tagId" = $1', [id]);

            if (!check.rows.length) {
                console.log(`There is no tag with id ${id} in database`);
            } else {
                await pool.query(text, [id]);

                console.log(`Record with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async showDataTag() {
        try {
            const tags = await pool.query('SELECT * FROM "Tags"');

            Printer.printTags(tags.rows);
        } catch (err) {
            console.log(err);
        }
    }
}