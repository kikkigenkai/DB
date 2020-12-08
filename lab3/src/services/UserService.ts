import { User } from '../entity/User.js';
import { Reader } from '../utils/readers.js';
import { Printer } from '../utils/printers.js';

import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';

export class UserService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async addDataUser() {
        const user: User = Reader.prepareDataUser();

        try {
            await this.connection.manager.save(user);

            console.log(`User with name ${user.username} has been saved`);

            return;
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }

    async editDataUser() {
        const editId: number = +question('id of user: ');

        try {
            const userRepo: Repository<User> = getRepository(User);
            let user: User = await userRepo.findOne({ where: { user_id: editId } });
            
            if (!user) {
                console.log(`There is no user with id ${editId} in table User`);

                return;
            } else {
                user = Reader.prepareDataUser();
                await this.connection
                    .createQueryBuilder()
                    .update(User)
                    .set({ username: user.username })
                    .where('user_id = :id', { id: editId })
                    .execute();

                console.log(`User with id ${editId} has been updated`);

                return;
            }
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }

    async deleteDataUser() {
        const deleteId: number = +question('id of user for deleting: ');

        try {
            const userRepo: Repository<User> = getRepository(User);
            const user: User = await userRepo.findOne({ where: { user_id: deleteId } });

            if (!user) {
                console.log(`There is no user with id ${deleteId} in table User`);

                return;
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(User)
                    .where('user_id = :id', { id: deleteId })
                    .execute();

                console.log(`User with id ${deleteId} has been deleted`);

                return;
            }
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }

    async showDataUser() {
        try {
            const users: User[] = await this.connection.manager.find(User);

            Printer.printUsers(users);

            return;
        } catch (err) {
            console.log(err);

            return;
        }
    }
}