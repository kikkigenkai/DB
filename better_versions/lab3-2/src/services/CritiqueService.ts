import { Critique } from '../entity/Critique.js';
import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';

import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';

export class CritiqueService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async addDataCritique() {
        try {
            const critique: Critique = Reader.prepareDataCritique();

            await this.connection.manager.save(critique);

            console.log('Added 1 row to table Critique');
        } catch (err) {
            console.log(err);
        }
    }

    async editDataCritique() {
        try {
            const id: number = +question('critique id: ');
            const critiqueRepo: Repository<Critique> = getRepository(Critique);
            const critiqueEdit: Critique = await critiqueRepo.findOne({
                where: {
                    critique_id: id
                }
            });

            if (!critiqueEdit) {
                console.log(`There is no critique with id ${id}`);
            } else {
                const critique: Critique = Reader.prepareDataCritique();

                await this.connection
                    .createQueryBuilder()
                    .update(Critique)
                    .set({ ...critique })
                    .where('critique_id = :id', { id })
                    .execute();

                console.log(`Row with id ${id} has been updated`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async deleteDataCritique() {
        try {
            const id: number = +question('critique id: ');
            const critiqueRepo: Repository<Critique> = getRepository(Critique);
            const critiqueEdit: Critique = await critiqueRepo.findOne({
                where: {
                    critique_id: id
                }
            });

            if (!critiqueEdit) {
                console.log(`There is no critique with id ${id}`);
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(Critique)
                    .where('critique_id = :id', { id })
                    .execute();

                console.log(`Row with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async showDataCritique() {
        try {
            const critiques: Array<Critique> = await this.connection.manager.find(Critique);

            Printer.printCritiques(critiques);
        } catch (err) {
            console.log(err);
        }
    }
}