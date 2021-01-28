import { Creator } from '../entity/Creator.js';
import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';

import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';

export class CreatorService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async addDataCreator() {
        try {
            const creator: Creator = Reader.prepareDataCreator();

            await this.connection.manager.save(creator);

            console.log('Added 1 row on table Creator');
        } catch (err) {
            console.log(err);
        }
    }

    async editDataCreator() {
        try {
            const id: number = +question('creator id: ');
            const creatorRepo: Repository<Creator> = getRepository(Creator);
            const creatorObj: Creator = await creatorRepo.findOne({
                where: {
                    creator_id: id
                }
            });

            if (!creatorObj) {
                console.log(`There is no creator with id ${id}`);
            } else {
                const creator: Creator = Reader.prepareDataCreator();

                await this.connection
                    .createQueryBuilder()
                    .update(Creator)
                    .set({ ...creator })
                    .where('creator_id = :id', { id })
                    .execute();

                console.log(`Row with id ${id} has been updated`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async deleteDataCreator() {
        try {
            const id: number = +question('creator id: ');
            const creatorRepo: Repository<Creator> = getRepository(Creator);
            const creatorObj: Creator = await creatorRepo.findOne({
                where: {
                    creator_id: id
                }
            });

            if (!creatorObj) {
                console.log(`There is no creator with id ${id}`);
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(Creator)
                    .where('creator_id = :id', { id })
                    .execute();

                console.log(`Row with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async showDataCreator() {
        try {
            const creators: Array<Creator> = await this.connection.manager.find(Creator);

            Printer.printCreators(creators);
        } catch (err) {
            console.log(err);
        }
    }
}