import { Hire } from '../entity/Hire.js';
import { Creator } from '../entity/Creator.js';
import { Publisher } from '../entity/Publisher.js';
import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';

import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';

export class HireService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async addDataHire() {
        try {
            const hire: Hire = Reader.prepareDataHire();
            const crRepo: Repository<Creator> = getRepository(Creator);
            const pubRepo: Repository<Publisher> = getRepository(Publisher);

            const crObj: Creator = await crRepo.findOne({
                where: {
                    creator_id: hire.hire_creator_id
                }
            });
            const pubObj: Publisher = await pubRepo.findOne({
                where: {
                    publisher_id: hire.hire_publisher_id
                }
            });

            if (!crObj || !pubRepo) {
                console.log(`There is no creator with id ${hire.hire_creator_id} or publisher with id ${hire.hire_publisher_id}`);
            } else {
                await this.connection.manager.save(hire);

                console.log('Added 1 row to table Hire');
            }
        } catch (err) {
            console.log(err);
        }
    }

    async editDataHire() {
        try {
            const id: number = +question('hire id: ');
            const hireRepo: Repository<Hire> = getRepository(Hire);

            const hireEdit: Hire = await hireRepo.findOne({
                where: {
                    hire_id: id
                }
            });

            if (!hireEdit) {
                console.log(`There is no hire with id ${id}`);
            } else {
                const hire: Hire = Reader.prepareDataHire();
                const crRepo: Repository<Creator> = getRepository(Creator);
                const pubRepo: Repository<Publisher> = getRepository(Publisher);

                const crObj: Creator = await crRepo.findOne({
                    where: {
                        creator_id: hire.hire_creator_id
                    }
                });
                const pubObj: Publisher = await pubRepo.findOne({
                    where: {
                        publisher_id: hire.hire_publisher_id
                    }
                });

                if (!crObj || !pubObj) {
                    console.log(`There is no creator with id ${hire.hire_creator_id} or publisher with id ${hire.hire_publisher_id}`);
                } else {
                    await this.connection
                        .createQueryBuilder()
                        .update(Hire)
                        .set({ ...hire })
                        .where('hire_id = :id', { id })
                        .execute();

                    console.log(`Hire with id ${id} has been updated`);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    async deleteDataHire() {
        try {
            const id: number = +question('hire id: ');
            const hireRepo: Repository<Hire> = getRepository(Hire);

            const hireEdit: Hire = await hireRepo.findOne({
                where: {
                    hire_id: id
                }
            });

            if (!hireEdit) {
                console.log(`There is no hire with id ${id}`);
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(Hire)
                    .where('hire_id = :id', { id })
                    .execute();

                console.log(`Hire with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async showDataHire() {
        try {
            const hires: Array<Hire> = await this.connection.manager.find(Hire);

            Printer.printHires(hires);
        } catch (err) {
            console.log(err);
        }
    }
}