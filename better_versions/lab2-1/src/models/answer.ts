const pool = require('../db.js');
import { question } from 'readline-sync';

import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';
import { Answer } from '../types.js';

export class AnswerModel {
    static async addDataAnswer() {
        try {
            const text: string = 'INSERT INTO "Answer" ("aHeader", "aText", "aCreationDate", "a_author_id", "a_question_id") VALUES ($1, $2, $3, $4, $5)';
            const ans: Answer = Reader.prepareDataAnswer();
            const user = await pool.query('SELECT * FROM "Users" WHERE "userId" = $1', [ans.a_author_id]);
            const quest = await pool.query('SELECT * FROM "Questions" WHERE "questionId" = $1', [ans.a_question_id]);

            if (!user.rows.length || !quest.rows.length) {
                console.log(`There is no user with id ${ans.a_author_id} or question with id ${ans.a_question_id} in database`);
            } else {
                await pool.query(text, [ans.aHeader, ans.aText, ans.aCreationDate, ans.a_author_id, ans.a_question_id]);

                console.log('Added 1 element to table Answer');
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async editDataAnswer() {
        try {
            const id: number = +question('answer id: ');
            const newAns: Answer = Reader.prepareDataAnswer();
            const text: string = 'UPDATE "Answer" SET "aHeader" = $1, "aText" = $2, "aCreationDate" = $3, "a_author_id" = $4, "a_question_id" = $5 WHERE "answerId" = $6';
            const check = await pool.query('SELECT * FROM "Answer" WHERE "answerId" = $1', [id]);

            if (!check.rows.length) {
                console.log(`There is no answer with id ${id}`);
            } else {
                const checkUser = await pool.query('SELECT * FROM "Users" WHERE "userId" = $1', [newAns.a_author_id]);
                const checkQuestion = await pool.query('SELECT * FROM "Questions" WHERE "questionId" = $1', [newAns.a_question_id]);

                if (!checkUser.rows.length || !checkQuestion.rows.length) {
                    console.log(`There is no user with id ${newAns.a_author_id} or question with id ${newAns.a_question_id}`);
                } else {
                    await pool.query(text, [newAns.aHeader, newAns.aText, newAns.aCreationDate, newAns.a_author_id, newAns.a_question_id, id]);

                    console.log(`Row with id ${id} has been updated`);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteDataAnswer() {
        try {
            const id: number = +question('answer id: ');
            const text: string = 'DELETE FROM "Answer" WHERE "answerId" = $1';
            const check = await pool.query('SELECT * FROM "Answer" WHERE "answerId" = $1', [id]);

            if (!check.rows.length) {
                console.log(`There is no answer with id ${id}`);
            } else {
                await pool.query(text, [id]);

                console.log(`Row with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async showDataAnswer() {
        try {
            const answers = await pool.query('SELECT * FROM "Answer"');

            Printer.printAnswers(answers.rows);
        } catch (err) {
            console.log(err);
        }
    }
}