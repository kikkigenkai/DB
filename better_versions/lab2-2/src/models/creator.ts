const pool = require('../db.js');
import { question } from 'readline-sync';

import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';
import { Creator } from '../types.js';

export class CreatorModel {
    static async addDataCreator() {
        try {
            const text: string = 'INSERT INTO "creator" ("crName", "active") VALUES ($1, $2)';
            const creator: Creator = Reader.prepareDataCreator();

            await pool.query(text, [creator.crName, creator.active]);

            console.log('Added 1 row to table Creator');
        } catch (err) {
            console.log(err);
        }
    }

    static async editDataCreator() {
        try {
            const id: number = +question('creator id: ');
            const check: string = 'SELECT * FROM "creator" WHERE "creator_id" = $1';
            const text: string = 'UPDATE "creator" SET "crName" = $1, "active" = $2 WHERE "creator_id" = $3';
            const crCheck = await pool.query(check, [id]);

            if (!crCheck.rows.length) {
                console.log(`There is no creator with id ${id}`);
            } else {
                const creator: Creator = Reader.prepareDataCreator();

                await pool.query(text, [creator.crName, creator.active, id]);

                console.log(`Row with id ${id} has been updated`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteDataCreator() {
        try {
            const id: number = +question('creator id: ');
            const check: string = 'SELECT * FROM "creator" WHERE "creator_id" = $1';
            const text: string = 'DELETE FROM "creator" WHERE "creator_id" = $1';
            const crCheck = await pool.query(check, [id]);

            if (!crCheck.rows.length) {
                console.log(`There is no creator with id ${id}`);
            } else {
                await pool.query(text, [id]);

                console.log(`Row with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    static async showDataCreator() {
        try {
            const creators = await pool.query('SELECT * FROM "creator"');

            Printer.printCreators(creators.rows);
        } catch (err) {
            console.log(err);
        }
    }
}