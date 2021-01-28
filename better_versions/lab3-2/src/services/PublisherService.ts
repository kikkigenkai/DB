import { Publisher } from '../entity/Publisher.js';
import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';

import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';

export class PublisherService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async addDataPublisher() {
        try {
            const publisher: Publisher = Reader.prepareDataPublisher();

            await this.connection.manager.save(publisher);

            console.log('Added 1 row to table Publisher');
        } catch (err) {
            console.log(err);
        }
    }

    async editDataPublisher() {
        try {
            const id: number = +question('publisher id: ');
            const pubRepo: Repository<Publisher> = getRepository(Publisher);
            const pubEdit: Publisher = await pubRepo.findOne({
                where: {
                    publisher_id: id
                }
            });

            if (!pubEdit) {
                console.log(`There is no publisher with id ${id}`);
            } else {
                const newPublisher: Publisher = Reader.prepareDataPublisher();

                await this.connection
                    .createQueryBuilder()
                    .update(Publisher)
                    .set({ ...newPublisher })
                    .where('publisher_id = :id', { id })
                    .execute();
                
                console.log(`Row with id ${id} has been updated`);
            }
        } catch (err) { 
            console.log(err);
        }
    }

    async deleteDataPublisher() {
        try {
            const id: number = +question('publisher id: ');
            const pubRepo: Repository<Publisher> = getRepository(Publisher);
            const pubEdit: Publisher = await pubRepo.findOne({
                where: {
                    publisher_id: id
                }
            });

            if (!pubEdit) {
                console.log(`There is no publisher with id ${id}`);
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(Publisher)
                    .where('publisher_id = :id', { id })
                    .execute();
                
                console.log(`Row with id ${id} has been deleted`);
            }
        } catch (err) { 
            console.log(err);
        }
    }

    async showDataPublisher() {
        try {
            const pubs: Array<Publisher> = await this.connection.manager.find(Publisher);
            
            Printer.printPublishers(pubs);
        } catch (err) {
            console.log(err);
        }
    }
}