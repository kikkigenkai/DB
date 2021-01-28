const pool = require('../db.js');
import { question } from 'readline-sync';

import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';
import { Critique } from '../types.js';

export class CritiqueModel {
    static async addDataCritique() {
        try {
            const text: string = 'INSERT INTO "critique" ("qName") VALUES ($1)';
            const critique: Critique = Reader.prepareDataCritique();

            await pool.query(text, [critique.qName]);

            console.log('Added 1 row to table Critique');
        } catch (err) {
            console.log(err);
        }
    }

    static async editDataCritique() {
        try {
            const id: number = +question('critique id: ');
            const check: string = 'SELECT * FROM "critique" WHERE "critique_id" = $1';
            const text: string = 'UPDATE "critique" SET "qName" = $1 WHERE "critique_id" = $2';
            const critiqueCheck = await pool.query(check, [id]);

            if (!critiqueCheck.rows.length) {
                console.log(`There is no critique with id ${id}`);
            } else {
                const critique: Critique = Reader.prepareDataCritique();

                await pool.query(text, [critique.qName, id]);

                console.log(`Row with id ${id} has been updated`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteDataCritique() {
        try {
            const id: number = +question('critique id: ');
            const check: string = 'SELECT * FROM "critique" WHERE "critique_id" = $1';
            const text: string = 'DELETE FROM "critique" WHERE "critique_id" = $1';
            const critiqueCheck = await pool.query(check, [id]);

            if (!critiqueCheck.rows.length) {
                console.log(`There is no critique with id ${id}`);
            } else {
                await pool.query(text, [id]);

                console.log(`Row with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async showDataCritique() {
        try {
            const critiques = await pool.query('SELECT * FROM "critique"');

            Printer.printCritiques(critiques.rows);
        } catch (err) {
            console.log(err);
        }
    }
}