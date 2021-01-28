const pool = require('../db.js');
import { question } from 'readline-sync';

import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';
import { Game } from '../types.js';

export class GameModel {
    static async addDataGame() {
        try {
            const text: string = 'INSERT INTO "game" ("gName", "genre", "price", "release_date", "g_cr_id") VALUES ($1, $2, $3, $4, $5)';
            const game: Game = Reader.prepareDataGame();
            const checkCr: string = 'SELECT * FROM "creator" WHERE "creator_id" = $1';
            const crObj = await pool.query(checkCr, [game.g_cr_id]);

            if (!crObj.rows.length) {
                console.log(`There is no creator with id ${game.g_cr_id}`);
            } else {
                await pool.query(text, [game.gName, game.genre, game.price, game.release_date, game.g_cr_id]);

                console.log('Added 1 element to table Game');
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async editDataGame() {
        try {
            const id: number = +question('game id: ');
            const check: string = 'SELECT * from "game" WHERE "game_id" = $1';
            const text: string = 'UPDATE "game" SET "gName" = $1, "genre" = $2, "price" = $3, "release_date" = $4, "g_cr_id" = $5 WHERE "game_id" = $6';
            const gameCheck = await pool.query(check, [id]);

            if (!gameCheck.rows.length) {
                console.log(`There is no game with id ${id}`);
            } else {
                const game: Game = Reader.prepareDataGame();
                const checkCr: string = 'SELECT * FROM "creator" WHERE "creator_id" = $1';
                const crObj = await pool.query(checkCr, [game.g_cr_id]);

                if (!crObj.rows.length) {
                    console.log(`There is no creator with id ${game.g_cr_id}`);
                } else {
                    await pool.query(text, [game.gName, game.genre, game.price, game.release_date, game.g_cr_id, id]);

                    console.log(`Row with id ${id} has been updated`);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteDataGame() {
        try {
            const id: number = +question('game id: ');
            const check: string = 'SELECT * from "game" WHERE "game_id" = $1';
            const text: string = 'DELETE FROM "game" WHERE "game_id" = $1';
            const gameCheck = await pool.query(check, [id]);

            if (!gameCheck.rows.length) {
                console.log(`There is no game with id ${id}`);
            } else {
                await pool.query(text, [id]);

                console.log(`Row with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async showDataGame() {
        try {
            const games = await pool.query('SELECT * FROM "game"');

            Printer.printGames(games.rows);
        } catch (err) {
            console.log(err);
        }
    }
}