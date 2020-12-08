import { UserPassport } from '../entity/UserPassport.js';
import { Reader } from '../utils/readers.js';
import { Printer } from '../utils/printers.js';

import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';

export class UserPassportService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async addDataUserPassport() {
        const userPass: UserPassport = Reader.prepareDataUserPassport();

        try {
            await this.connection.manager.save(userPass);

            console.log('Added 1 element to table UserPassport');

            return;
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }

    async editDataUserPassport() {
        const editId: number = +question('id of user passport: ');

        try {
            const userPassRepo: Repository<UserPassport> = getRepository(UserPassport);
            let userPass: UserPassport = await userPassRepo.findOne({
                where: {
                    user_passport_id: editId
                }
            });

            if (!userPass) {
                console.log(`There is no user passport with id ${editId} in database`);

                return;
            } else {
                userPass = Reader.prepareDataUserPassport();
                await this.connection
                    .createQueryBuilder()
                    .update(UserPassport)
                    .set({ ...userPass })
                    .where('user_passport_id = :id', { id: editId })
                    .execute();

                console.log(`User passport with id ${editId} has been updated`);

                return;
            }
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }

    async deleteDataUserPassport() {
        const deleteId: number = +question('User passport id: ');

        try {
            const userPassRepo: Repository<UserPassport> = getRepository(UserPassport);
            let userPass: UserPassport = await userPassRepo.findOne({
                where: {
                    user_passport_id: deleteId
                }
            });

            if (!userPass) {
                console.log(`There is no user passport with id ${deleteId} in database`);

                return;
            } else {
                userPass = Reader.prepareDataUserPassport();
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(UserPassport)
                    .where('user_passport_id = :id', { id: deleteId })
                    .execute();

                console.log(`User passport with id ${deleteId} has been deleted`);

                return;
            }
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }

    async showDataUserPassport() {
        try {
            const userPassports: UserPassport[] = await this.connection.manager.find(UserPassport);

            Printer.printUserPassports(userPassports);

            return;
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }
}