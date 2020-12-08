import { Passport } from '../entity/Passport.js';
import { Reader } from '../utils/readers.js';
import { Printer } from '../utils/printers.js';

import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';

export class PassportService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async addDataPassport() {
        const passport: Passport = Reader.prepareDataPassport();

        try {
            await this.connection.manager.save(passport);

            console.log(`Passport with id ${passport.passport_id} has been saved`);

            return;
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }

    async editDataPassport() {
        const editId: number = +question('Passport id: ');

        try {
            const passportRepo: Repository<Passport> = getRepository(Passport);
            let passport: Passport = await passportRepo.findOne({ where: { passport_id: editId } });

            if (!passport) {
                console.log(`There is no passport with id ${editId} in table Passport`);

                return;
            } else {
                passport = Reader.prepareDataPassport();
                await this.connection
                    .createQueryBuilder()
                    .update(Passport)
                    .set({ ...passport })
                    .where('passport_id = :id', { id: editId })
                    .execute();

                console.log(`Passport with id ${editId} has been updated`);

                return;
            }
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }

    async deleteDataPassport() {
        const deleteId: number = +question('Passport id: ');

        try {
            const passportRepo: Repository<Passport> = getRepository(Passport);
            let passport: Passport = await passportRepo.findOne({ where: { passport_id: deleteId } });

            if (!passport) {
                console.log(`There is no passport with id ${deleteId} in table Passport`);

                return;
            } else {
                passport = Reader.prepareDataPassport();
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(Passport)
                    .where('passport_id = :id', { id: deleteId })
                    .execute();

                console.log(`Passport with id ${deleteId} has been deleted`);

                return;
            }
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }

    async showDataPassport() {
        try {
            const passports: Passport[] = await this.connection.manager.find(Passport);

            Printer.printPassports(passports);

            return;
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }
}