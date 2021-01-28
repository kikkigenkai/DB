const pool = require('../db.js');
import { question } from 'readline-sync';

export class Generate {
    static async generateGames() {
        try {
            const num: number = +question('number of records: ');
            const text: string = `
                insert into "game" ("gName", "genre", "price", "release_date")
                    select substr(characters, (random() * length(characters) + 1)::integer, 10),
                    substr(characters, (random() * length(characters) + 1)::integer, 10),
                    trunc(random() * 100)::int,
                    timestamp '2018-01-10' + random() * (timestamp '2018-01-20' - timestamp '2018-01-10')
                    from (values('qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM')) as symbols(characters), generate_series(1, $1);
            `;

            const start: number = Date.now();
            await pool.query(text, [num]);
            const queryTime: number = Date.now() - start;

            console.log(`${num} rows has been generated in table Game`);
            console.log(`query time: ${queryTime}ms`);
        } catch (err) {
            console.log(err);
        }
    }
}