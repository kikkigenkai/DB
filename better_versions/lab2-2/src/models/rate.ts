const pool = require('../db.js');
import { question } from 'readline-sync';

import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';
import { Rate } from '../types.js';

export class RateModel {
    static async addDataRate() {
        try {
            const text: string = 'INSERT INTO "rate" ("rate_game_id", "rate_critique_id") VALUES ($1, $2)';
            const rate: Rate = Reader.prepareDataRate();
            const checkGame: string = 'SELECT * FROM "game" WHERE "game_id" = $1';
            const checkCritique: string = 'SELECT * FROM "critique" WHERE "critique_id" = $1';
            const crObj = await pool.query(checkCritique, [rate.rate_critique_id]);
            const gameObj = await pool.query(checkGame, [rate.rate_game_id]);

            if (!crObj.rows.length || !gameObj.rows.length) {
                console.log(`There is no game with id ${rate.rate_game_id} or critique with id ${rate.rate_critique_id}`);
            } else {
                await pool.query(text, [rate.rate_game_id, rate.rate_critique_id]);

                console.log('Added 1 row to table Rate');
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async editDataRate() {
        try {
            const id: number = +question('rate id: ');
            const text: string = 'UPDATE "rate" SET "rate_game_id" = $1, "rate_critique_id" = $2 WHERE "rate_id" = $3';
            const rate: Rate = Reader.prepareDataRate();
            const checkRate: string = 'SELECT * FROM "rate" WHERE "rate_id" = $1';
            const checkGame: string = 'SELECT * FROM "game" WHERE "game_id" = $1';
            const checkCritique: string = 'SELECT * FROM "critique" WHERE "critique_id" = $1';
            const rateObj = await pool.query(checkRate, [id]);

            if (!rateObj.rows.length) {
                console.log(`There is no rate with id ${id}`);
            } else {
                const crObj = await pool.query(checkCritique, [rate.rate_critique_id]);
                const gameObj = await pool.query(checkGame, [rate.rate_game_id]);

                if (!crObj.rows.length || !gameObj.rows.length) {
                    console.log(`There is no game with id ${rate.rate_game_id} or critique with id ${rate.rate_critique_id}`);
                } else {
                    await pool.query(text, [rate.rate_game_id, rate.rate_critique_id, id]);
    
                    console.log(`Row with id ${id} has been updated`);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteDataRate() {
        try {
            const id: number = +question('rate id: ');
            const text: string = 'DELETE FROM "rate" WHERE "rate_id" = $1';
            const checkRate: string = 'SELECT * FROM "rate" WHERE "rate_id" = $1';
            const rateObj = await pool.query(checkRate, [id]);

            if (!rateObj.rows.length) {
                console.log(`There is no rate with id ${id}`);
            } else {
                await pool.query(text, [id]);

                console.log(`Row with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async showDataRate() {
        try {
            const rates = await pool.query('SELECT * FROM "rate"');

            Printer.printRates(rates.rows);
        } catch (err) {
            console.log(err);
        }
    }
}