const pool = require('../db.js');
import { question } from 'readline-sync';

import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';
import { Question } from '../types.js';

export class QuestionModel {
    static async addDataQuestion() {
        try {
            const quest: Question = Reader.prepareDataQuestion();
            const text: string = 'INSERT INTO "Questions" ("qHeader", "qText", "creationDate", "authorId") VALUES ($1, $2, $3, $4)';
            const checkUser = await pool.query('SELECT * FROM "Users" WHERE "userId" = $1', [quest.authorId]);

            if (!checkUser.rows.length) {
                console.log(`There is no user with id ${quest.authorId}`);
            } else {
                await pool.query(text, [quest.qHeader, quest.qText, quest.creationDate, quest.authorId]);

                console.log('Added 1 row to table Questions');
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async editDataQuestion() {
        try {
            const id: number = +question('question id: ');
            const text: string = 'UPDATE "Questions" SET "qHeader" = $1, "qText" = $2, "creationDate" = $3, "authorId" = $4 WHERE "questionId" = $5';
            const newQuest: Question = Reader.prepareDataQuestion();
            const checkUser = await pool.query('SELECT * FROM "Users" WHERE "userId" = $1', [newQuest.authorId]);
            const checkQuestion = await pool.query('SELECT * FROM "Questions" WHERE "questionId" = $1', [id]);

            if (!checkQuestion.rows.length) {
                console.log(`There is no question with id ${id}`);
            } else {
                if (!checkUser.rows.length) {
                    console.log(`There is no user with id ${newQuest.authorId}`);
                } else {
                    await pool.query(text, [newQuest.qHeader, newQuest.qText, newQuest.creationDate, newQuest.authorId, id]);

                    console.log(`Row with id ${id} has been updated`);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteDataQuestion() {
        try {
            const id: number = +question('question id: ');
            const text: string = 'DELETE FROM "Questions" WHERE "questionId" = $1';
            const checkQuestion = await pool.query('SELECT * FROM "Questions" WHERE "questionId" = $1', [id]);

            if (!checkQuestion.rows.length) {
                console.log(`There is no question with id ${id}`);
            } else {
                await pool.query(text, [id]);

                console.log(`Row with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async showDataQuestion() {
        try {
            const questions = await pool.query('SELECT * FROM "Questions"');

            Printer.printQuestion(questions.rows);
        } catch (err) {
            console.log(err);
        }
    }
}