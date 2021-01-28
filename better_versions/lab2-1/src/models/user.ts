const pool = require('../db.js');
import { question } from 'readline-sync';

import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';
import { Users } from '../types.js';

export class UserModel {
    static async addDataUser() {
        try {
            const newUser: Users = Reader.prepareDataUser();
            const text: string = 'INSERT INTO "Users" (username, reg_date, rating) VALUES($1, $2, $3);';

            await pool.query(text, [newUser.username, newUser.reg_date, newUser.rating]);

            console.log('Added 1 row to table Users');
        } catch (err) {
            console.log(err);
        }
    }

    static async editDataUser() {
        try {
            const id: number = +question('user id: ');
            const updateUser: Users = Reader.prepareDataUser();
            const text: string = 'UPDATE "Users" SET username = $1, reg_date = $2, rating = $3 WHERE "userId" = $4';
            const check = await pool.query('SELECT * FROM "Users" WHERE "userId" = $1', [id]);

            if (!check.rows.length) {
                console.log(`There is no user with id ${id} in database`);
            } else {
                await pool.query(text, [updateUser.username, updateUser.reg_date, updateUser.rating, id]);

                console.log(`Record with id ${id} has been updated`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteDataUser() {
        try {
            const id: number = +question('user id: ');
            const text: string = 'DELETE FROM "Users" WHERE "userId" = $1';
            const check = await pool.query('SELECT * FROM "Users" WHERE "userId" = $1', [id]);

            if (!check.rows.length) {
                console.log(`There is no user with id ${id} in database`);
            } else {
                await pool.query(text, [id]);

                console.log(`Record with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async showDataUser() {
        try {
            const users = await pool.query('SELECT * FROM "Users"');

            Printer.printUsers(users.rows);
        } catch (err) {
            console.log(err);
        }
    }
}