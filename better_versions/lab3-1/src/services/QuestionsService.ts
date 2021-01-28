import { Questions } from '../entity/Questions.js';
import { Users } from '../entity/Users.js';
import { Reader } from '../utils/reader.js';

import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';
import { Printer } from '../utils/printer.js';

export class QuestionsService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async addDataQuestions() {
        const quest: Questions = Reader.prepareDataQuestion();

        try {
            await this.connection.manager.save(quest);

            console.log(`Question with id ${quest.questionId} has been saved`);
        } catch (err) {
            console.log(err);
        }
    }

    async editDataQuestions() {
        const id: number = +question('Question id: ');

        try {
            const newQuestion: Questions = Reader.prepareDataQuestion();
            const questionRepo: Repository<Questions> = getRepository(Questions);
            const userRepo: Repository<Users> = getRepository(Users);

            const quest: Questions = await questionRepo.findOne({
                where: { questionId: id }
            });

            if (!quest) {
                console.log(`There is no question with id ${id}`);
            } else {
                const user: Users = await userRepo.findOne({
                    where: { userId: newQuestion.authorId }
                });

                if (!user) {
                    console.log(`There is no user with id ${newQuestion.authorId}`);
                } else {
                    await this.connection
                        .createQueryBuilder()
                        .update(Questions)
                        .set({ ...newQuestion })
                        .where('questionId = :id', { id })
                        .execute();
                    
                    console.log(`Question with id ${id} has been updated`);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    async deleteDataQuestions() {
        const id: number = +question('Question id: ');

        try {
            const questionRepo: Repository<Questions> = getRepository(Questions);

            const quest: Questions = await questionRepo.findOne({
                where: { questionId: id }
            });

            if (!quest) {
                console.log(`There is no question with id ${id}`);
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(Questions)
                    .where('questionId = :id', { id })
                    .execute();
                
                console.log(`Question with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async showDataQuestions() {
        try {
            const questions: Array<Questions> = await this.connection.manager.find(Questions);

            Printer.printQuestion(questions);
        } catch (err) {
            console.log(err);
        }
    }
}