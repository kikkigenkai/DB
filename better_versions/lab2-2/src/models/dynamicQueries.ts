const pool = require('../db.js');
import { question } from 'readline-sync';

import { Format } from '../utils/format.js';

export class DynamicQueries {
    static async specPub() {
        try {
            const publisher: string = question('publisher name: ');
            const text: string = `
                with pub as (
                    select s."pubName", "hire_creator_id" from "hire" join
                    (select * from "publisher" where "pubName" = $1) s on "hire_publisher_id" = s."publisher_id"
                )
                
                select "pubName", s."crName" from pub join "creator" s on pub."hire_creator_id" = s."creator_id";
            `;

            const start: number = Date.now();
            const result = await pool.query(text, [publisher]);
            const queryTime: number = Date.now() - start;
            
            if (!result.rows.length) {
                console.log('No result');
            } else {
                console.log('   pubName       |     crName     ');
                console.log('__________________________________');
                
                result.rows.forEach((item: any) => {
                    let modPName: string = '';
                    let modCName: string = '';

                    if (item.pubName.length > 17) {
                        modPName = item.pubName.substr(0, 14) + '...';
                    } else {
                        modPName = Format.toField(17, item.pubName);
                    }

                    if (item.crName.length > 16) {
                        modCName = item.crName.substr(0, 13) + '...';
                    } else {
                        modCName = Format.toField(16, item.crName);
                    }

                    console.log(`${modPName}|${modCName}`);
                    console.log('__________________________________');
                });
                console.log(`query time: ${queryTime}ms`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async gamesByCr() {
        try {
            const creator: string = question('creator name: ');
            const text: string = `
                select "gName", "genre", s."crName" from "game" join 
                (select * from "creator" where "crName" = $1) s on s."creator_id" = "g_cr_id"
            `;

            const start: number = Date.now();
            const result = await pool.query(text, [creator]);
            const queryTime: number = Date.now() - start;
            
            if (!result.rows.length) {
                console.log('No result');
            } else {
                console.log('   gName       |     genre    |     crName  ');
                console.log('____________________________________________');
                
                result.rows.forEach((item: any) => {
                    let modGName: string = '';
                    let modGenre: string = '';
                    let modCName: string = '';

                    if (item.gName.length > 15) {
                        modGName = item.gName.substr(0, 12) + '...';
                    } else {
                        modGName = Format.toField(15, item.gName);
                    }

                    if (item.genre.length > 14) {
                        modGenre = item.genre.substr(0, 11) + '...';
                    } else {
                        modGenre = Format.toField(14, item.genre);
                    }

                    if (item.crName.length > 14) {
                        modCName = item.crName.substr(0, 11) + '...';
                    } else {
                        modCName = Format.toField(14, item.crName);
                    }

                    console.log(`${modGName}|${modGenre}|${modCName}`);
                    console.log('____________________________________________');
                });
                console.log(`query time: ${queryTime}ms`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async topCrit() {
        try {
            const text: string = `
                select "qName", s."cnt" from "critique" join
                (select "rate_critique_id", count("rate_critique_id") as cnt from "rate"
                group by ("rate_critique_id")) as s 
                on "critique_id" = s."rate_critique_id"
                order by "cnt" desc
            `;

            const start: number = Date.now();
            const result = await pool.query(text);
            const queryTime: number = Date.now() - start;
            
            if (!result.rows.length) {
                console.log('No result');
            } else {
                console.log('   qName       |  cnt ');
                console.log('______________________');
                
                result.rows.forEach((item: any) => {
                    let modQName: string = '';

                    if (item.qName.length > 15) {
                        modQName = item.qName.substr(0, 12) + '...';
                    } else {
                        modQName = Format.toField(15, item.qName);
                    }

                    console.log(`${modQName}|${item.cnt}`);
                    console.log('______________________');
                });
                console.log(`query time: ${queryTime}ms`);
            }
        } catch (err) {
            console.log(err);
        }
    }
}