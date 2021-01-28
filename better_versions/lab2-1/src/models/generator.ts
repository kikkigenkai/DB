const pool = require('../db.js');
import { question } from 'readline-sync';

import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';
import { Users } from '../types.js';

export class Generate {
    static async generateUsers() {
        try {
            const num: number = +question('number of records: ');
            const text: string = `
                insert into "Users" (username, reg_date, rating, confirmed)
                    select substr(characters, (random() * length(characters) + 1)::integer, 10),
                    timestamp '2018-01-10' + random() * (timestamp '2018-01-20' - timestamp '2018-01-10'),
                    trunc(random() * 1000)::int,
                    cast(cast(round(random()) as character varying) as boolean)
                    from (values('qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM')) as symbols(characters), generate_series(1, $1);
            `;

            const start: number = Date.now();
            await pool.query(text, [num]);
            const queryTime: number = Date.now() - start;

            console.log(`${num} rows has been generated in table Users`);
            console.log(`query time: ${queryTime}`);
        } catch (err) {
            console.log(err);
        }
    }
}