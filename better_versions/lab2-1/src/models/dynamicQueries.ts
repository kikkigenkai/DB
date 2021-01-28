const pool = require('../db.js');
import { question } from 'readline-sync';

import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';
import { Format } from '../utils/format.js';

export class DynamicQueries {
    static async specDate() {
        const date1: string = question('first date: ');
        const date2: string = question('second date: ');
        const text: string = `
            with confirmedUsers as (
                select * from "Users" where "confirmed" = true 
                and "userId" in (select "questionUser" from "Google_Profile")
            ),
            
            specDate as (
                select * from confirmedUsers where "reg_date" > $1 and "reg_date" < $2
            )
            
            select "username", "reg_date", "confirmed", m."email" from specDate join "Google_Profile" as m on m."questionUser" = specDate."userId";
        `;

        try {
            const start: number = Date.now();
            const result = await pool.query(text, [date1, date2]);
            const queryTime: number = Date.now() - start;
            
            if (!result.rows.length) {
                console.log('No result');
            } else {
                console.log('username   |  reg_date  | confirmed | email');
                console.log('_______________________________________________________');
                
                result.rows.forEach((item: any) => {
                    let modUName: string = '';

                    if (item.username.length > 11) {
                        modUName = item.username.substr(0, 8) + '...';
                    } else {
                        modUName = Format.toField(11, item.username);
                    }

                    console.log(`${modUName}|${Format.toField(12, Format.formatDate(item.reg_date))}|${Format.toField(11, item.confirmed.toString())}|${item.email}`);
                    console.log('_______________________________________________________');
                });
                console.log(`query time: ${queryTime}ms`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async specTag() {
        const tag: string = question('tag: ');
        const text: string = `
            with tagsIds as (
                select "tagId", "tName" from "Tags" where "tName" = $1
            ),
            
            questionIds as (
                select "tagId", "tName", qtb."qt_question_id" from tagsIds join "QuestionTagsBinding" as qtb on "tagId" in (select "qt_tag_id" from "QuestionTagsBinding")
            ),
            
            tagAndQ as (
                select distinct "tName", q."qHeader" 
                from questionIds 
                join "Questions" as q 
                on "qt_question_id" in (select "questionId" from "Questions")
            )
            
            select * from tagAndQ;
        `;

        try {
            const start: number = Date.now();
            const result = await pool.query(text, [tag]);
            const queryTime: number = Date.now() - start;

            if (!result.rows.length) {
                console.log('No result');
            } else {
                console.log('     tName      |       qHeader');
                console.log('______________________________________');
                
                result.rows.forEach((item: any) => {
                    let modTName: string = '';
                    let modHeader: string = '';

                    if (item.tName.length > 16) {
                        modTName = item.tName.substr(0, 13) + '...';
                    } else {
                        modTName = Format.toField(16, item.tName);
                    }

                    if (item.qHeader.length > 20) {
                        modHeader = item.qHeader.substr(0, 17) + '...';
                    } else {
                        modHeader = Format.toField(20, item.qHeader);
                    }

                    console.log(`${modTName}|${modHeader}`);
                    console.log('______________________________________');
                });
                console.log(`query time: ${queryTime}ms`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async specQDate() {
        try {
            const date: string = question('date: ');
            const text: string = `
                select count(*), "creationDate" from "Questions" where "creationDate" > $1
                group by "creationDate"
            `;
            const start: number = Date.now();
            const result = await pool.query(text, [date]);
            const queryTime: number = Date.now() - start;

            if (!result.rows.length) {
                console.log('No result');
            } else {
                console.log(' count |   creationDate');
                console.log('________________________');

                result.rows.forEach((item: any) => {

                    console.log(`${Format.toField(7, item.count.toString())}|${Format.formatDate(item.creationDate)}`);
                    console.log('________________________');
                });
                console.log(`query time: ${queryTime}ms`);
            }
        } catch (err) {
            console.log(err);
        }
    }
}