const pool = require('../db.js');
import { question } from 'readline-sync';

import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';
import { Publisher } from '../types.js';

export class PublisherModel {
    static async addDataPublisher() {
        try {
            const text: string = 'INSERT INTO "publisher" ("pubName") VALUES ($1)';
            const publisher: Publisher = Reader.prepareDataPublisher();

            await pool.query(text, [publisher.pubName]);

            console.log('Added 1 row to table Publisher');
        } catch (err) {
            console.log(err);
        }
    }

    static async editDataPublisher() {
        try {
            const id: number = +question('publisher id: ');
            const check: string = 'SELECT * FROM "publisher" WHERE "publisher_id" = $1';
            const text: string = 'UPDATE "publisher" SET "pubName" = $1 WHERE "publisher_id" = $2';
            const pubCheck = await pool.query(check, [id]);

            if (!pubCheck.rows.length) {
                console.log(`There is no publisher with id ${id}`);
            } else {
                const publisher: Publisher = Reader.prepareDataPublisher();

                await pool.query(text, [publisher.pubName, id]);

                console.log(`Row with id ${id} has been updated`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteDataPublisher() {
        try {
            const id: number = +question('publisher id: ');
            const check: string = 'SELECT * FROM "publisher" WHERE "publisher_id" = $1';
            const text: string = 'DELETE FROM "publisher" WHERE "publisher_id" = $1';
            const pubCheck = await pool.query(check, [id]);

            if (!pubCheck.rows.length) {
                console.log(`There is no publisher with id ${id}`);
            } else {
                await pool.query(text, [id]);

                console.log(`Row with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async showDataPublisher() {
        try {
            const publishers = await pool.query('SELECT * FROM "publisher"');

            Printer.printPublishers(publishers.rows);
        } catch (err) {
            console.log(err);
        }
    }
}