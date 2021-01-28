const pool = require('../db.js');
import { question } from 'readline-sync';

import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';
import { Hire } from '../types.js';

export class HireModel {
    static async addDataHire() {
        try {
            const text: string = 'INSERT INTO "hire" ("hire_publisher_id", "hire_creator_id") VALUES ($1, $2)';
            const hire: Hire = Reader.prepareDataHire();
            const checkPub: string = 'SELECT * FROM "publisher" WHERE "publisher_id" = $1';
            const checkCr: string = 'SELECT * FROM "creator" WHERE "creator_id" = $1';
            const pubObj = await pool.query(checkPub, [hire.hire_publisher_id]);
            const crObj = await pool.query(checkCr, [hire.hire_creator_id]);

            if (!pubObj.rows.length || !crObj.rows.length) {
                console.log(`There is no publisher with id ${hire.hire_publisher_id} or creator with id ${hire.hire_creator_id}`);
            } else {
                await pool.query(text, [hire.hire_publisher_id, hire.hire_creator_id]);

                console.log('Added 1 row to table Hire');
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async editDataHire() {
        try {
            const id: number = +question('hire id: ');
            const text: string = 'UPDATE "hire" SET "hire_publisher_id" = $1, "hire_creator_id" = $2 WHERE "hire_id" = $3';
            const hire: Hire = Reader.prepareDataHire();
            const checkHire: string = 'SELECT * FROM "hire" WHERE "hire_id" = $1';
            const hireObj = await pool.query(checkHire, [id]);

            if (!hireObj.rows.length) {
                console.log(`There is no hire with id ${id}`);
            } else {
                const checkPub: string = 'SELECT * FROM "publisher" WHERE "publisher_id" = $1';
                const checkCr: string = 'SELECT * FROM "creator" WHERE "creator_id" = $1';
                const pubObj = await pool.query(checkPub, [hire.hire_publisher_id]);
                const crObj = await pool.query(checkCr, [hire.hire_creator_id]);

                if (!pubObj.rows.length || !crObj.rows.length) {
                    console.log(`There is no publisher with id ${hire.hire_publisher_id} or creator with id ${hire.hire_creator_id}`);
                } else {
                    await pool.query(text, [hire.hire_publisher_id, hire.hire_creator_id, id]);
    
                    console.log(`Row with id ${id} has been updated`);
                }   
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteDataHire() {
        try {
            const id: number = +question('hire id: ');
            const text: string = 'DELETE FROM "hire" WHERE "hire_id" = $1';
            const checkHire: string = 'SELECT * FROM "hire" WHERE "hire_id" = $1';
            const hireObj = await pool.query(checkHire, [id]);

            if (!hireObj.rows.length) {
                console.log(`There is no hire with id ${id}`);
            } else {
                await pool.query(text, [id]);

                console.log(`Row with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async showDataHire() {
        try {
            const hires = await pool.query('SELECT * FROM "hire"');

            Printer.printHires(hires.rows);
        } catch (err) {
            console.log(err);
        }
    }
}