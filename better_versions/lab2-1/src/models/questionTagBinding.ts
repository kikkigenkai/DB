const pool = require('../db.js');
import { question } from 'readline-sync';

import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';
import { QuestionTagsBinding } from '../types.js';

export class QuestionTagBindingModel {
    static async addDataQTB() {
        try {
            const qtb: QuestionTagsBinding = Reader.prepareDataQuestionTagsBinding();
            const text: string = 'INSERT INTO "QuestionTagsBinding" ("qt_tag_id", "qt_question_id") VALUES ($1, $2)';
            const checkTag = await pool.query('SELECT * FROM "Tags" WHERE "tagId" = $1', [qtb.qt_tag_id]);
            const checkQuestion = await pool.query('SELECT * FROM "Questions" WHERE "questionId" = $1', [qtb.qt_question_id]);

            if (!checkTag.rows.length || !checkQuestion.rows.length) {
                console.log(`There is no tag with id ${qtb.qt_tag_id} or question with id ${qtb.qt_question_id}`);
            } else {
                await pool.query(text, [qtb.qt_tag_id, qtb.qt_question_id]);

                console.log('Added 1 row to table QuestionTagsBinding');
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async editDataQTB() {
        try {
            const id: number = +question('QTB id: ');
            const newQtb: QuestionTagsBinding = Reader.prepareDataQuestionTagsBinding();
            const text: string = 'UPDATE "QuestionTagsBinding" SET "qt_tag_id" = $1, "qt_question_id" = $2 WHERE "qtId" = $3';
            const checkQTB = await pool.query('SELECT * FROM "QuestionTagsBinding" WHERE "qtId" = $1', [id]);
            const checkTag = await pool.query('SELECT * FROM "Tags" WHERE "tagId" = $1', [newQtb.qt_tag_id]);
            const checkQuestion = await pool.query('SELECT * FROM "Questions" WHERE "questionId" = $1', [newQtb.qt_question_id]);

            if (!checkQTB.rows.length) {
                console.log(`There is no QTB with id ${id}`);
            } else {
                if (!checkTag.rows.length || !checkQuestion.rows.length) {
                    console.log(`There is no tag with id ${newQtb.qt_tag_id} or question with id ${newQtb.qt_question_id}`);
                } else {
                    await pool.query(text, [newQtb.qt_tag_id, newQtb.qt_question_id, id]);
    
                    console.log(`Row with id ${id} has been updated`);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteDataQTB() {
        try {
            const id: number = +question('QTB id: ');
            const text: string = 'DELETE FROM "QuestionTagsBinding" WHERE "qtId" = $1';
            const checkQTB = await pool.query('SELECT * FROM "QuestionTagsBinding" WHERE "qtId" = $1', [id]);

            if (!checkQTB.rows.length) {
                console.log(`There is no QTB with id ${id}`);
            } else {
                await pool.query(text, [id]);

                console.log(`Row with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async showDataQTB() {
        try {
            const qtbs = await pool.query('SELECT * FROM "QuestionTagsBinding"');

            Printer.printQTBs(qtbs.rows);
        } catch (err) {
            console.log(err);
        }
    }
}