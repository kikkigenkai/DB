import { Anime } from '../utils/types.js';
import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';

import { question } from 'readline-sync';

const pool = require('../db.js');

export class AnimeModel {
    static async addDataAnime() {
        try {
            const anime: Anime = Reader.prepareDataAnime();
            const text: string = 'INSERT INTO anime (a_name, description, series, genre) VALUES ($1, $2, $3, $4)';
            const checkQuerry: string = 'SELECT * FROM genre WHERE genre_id = $1';
            const check = await pool.query(checkQuerry, anime.genre);

            if (!check.rows.length) {
                console.log(`There is no genre with id ${anime.genre}`);
            } else {
                await pool.query(text, [anime.a_name, anime.description, anime.series, anime.genre]);

                console.log('Added 1 row to table anime');
            }
        } catch (err) { 
            console.log(err);
        }
    }

    static async editDataAnime() {
        try {
            const id: number = +question('anime id: ');
            const checkText: string = 'SELECT * FROM anime WHERE anime_id = $1';
            const check = await pool.query(checkText, [id]);

            if (!check.rows.length) {
                console.log(`There is no anime with id ${id}`);
            } else {
                const anime: Anime = Reader.prepareDataAnime();
                const text: string = 'UPDATE anime SET a_name = $1, description = $2, series = $3, genre = $4 WHERE anime_id = $5';

                await pool.query(text, [anime.a_name, anime.description, anime.series, anime.genre, id]);

                console.log(`Row with id ${id} has been updated`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteDataAnime() {
        try {
            const id: number = +question('anime id: ');
            const checkText: string = 'SELECT * FROM anime WHERE anime_id = $1';
            const check = await pool.query(checkText, [id]);

            if (!check.rows.length) {
                console.log(`There is no anime with id ${id}`);
            } else {
                const text: string = 'DELETE FROM anime WHERE anime_id = $1';;

                await pool.query(text, [id]);

                console.log(`Row with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async printDataAnime() {
        try {
            const animes = await pool.query('SELECT * FROM anime');

            Printer.printDataAnime(animes.rows);
        } catch (err) {
            console.log(err);
        }
    }
}