import { Tags } from '../entity/Tags.js';
import { Questions } from '../entity/Questions.js';
import { QTB } from '../entity/QTB.js';
import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';

import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';

export class QTBService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async addDataQTB() {
        const qtb: QTB = Reader.prepareDataQuestionTagsBinding();

        try {
            await this.connection.manager.save(qtb);

            console.log(`QTB with id ${qtb.qtId} has been saved`);
        } catch (err) {
            console.log(err);
        }
    }

    async editDataQTB() {
        const id: number = +question('QTB id: ');

        try {
            const newQTB: QTB = Reader.prepareDataQuestionTagsBinding();
            const qtbRepo: Repository<QTB> = getRepository(QTB);
            const questionRepo: Repository<Questions> = getRepository(Questions);
            const tagRepo: Repository<Tags> = getRepository(Tags);

            const qtb: QTB = await qtbRepo.findOne({
                where: { qtId: id }
            });

            if (!qtb) {
                console.log(`There is no QTB with id ${id}`);
            } else {
                const question: Questions = await questionRepo.findOne({
                    where: { questionId: newQTB.qt_question_id }
                });
                const tag: Tags = await tagRepo.findOne({
                    where: { tagId: newQTB.qt_tag_id }
                });

                if (!question || !tag) {
                    console.log(`There is no question with id ${newQTB.qt_question_id} or tag with id ${newQTB.qt_tag_id}`);
                } else {
                    await this.connection
                        .createQueryBuilder()
                        .update(QTB)
                        .set({ ...newQTB })
                        .where('qtId = :id', { id })
                        .execute();
    
                    console.log(`QTB with id ${id} has been updated`);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    async deleteDataQTB() {
        const id: number = +question('QTB id: ');

        try {
            const qtbRepo: Repository<QTB> = getRepository(QTB);
            const qtb: QTB = await qtbRepo.findOne({
                where: { qtId: id }
            });

            if (!qtb) {
                console.log(`There is no QTB with id ${id}`);
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(QTB)
                    .where('qtId = :id', { id })
                    .execute();

                console.log(`QTB with id ${id} has been deleted`);   
            }
        } catch (err) {
            console.log(err);
        }
    }

    async showDataQTB() {
        try {
            const qtbs: Array<QTB> = await this.connection.manager.find(QTB);

            Printer.printQTBs(qtbs);
        } catch (err) {
            console.log(err);
        }
    }
}