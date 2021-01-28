import { Users } from '../entity/Users.js';
import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';

import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';

export class UsersService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async addDataUsers() {
        const user: Users = Reader.prepareDataUser();

        try {
            await this.connection.manager.save(user);

            console.log(`User with id ${user.userId} has been saved`);
        } catch (err) {
            console.log(err);
        }
    }

    async editDataUsers() {
        const id: number = +question('User id: ');

        try {
            const userRepo: Repository<Users> = getRepository(Users);
            let userEdit: Users = await userRepo.findOne({
                where: { userId: id }
            });

            if (!userEdit) {
                console.log(`There is no user with id ${id}`);
            } else {
                const user: Users = Reader.prepareDataUser();

                await this.connection
                    .createQueryBuilder()
                    .update(Users)
                    .set({ ...user })
                    .where('userId = :id', {id})
                    .execute();

                console.log(`User with id ${id} has been updated`);
            }
        } catch(err) {
            console.log(err);
        }
    }

    async deleteDataUsers() {
        const id: number = +question('User id: ');

        try {
            const userRepo: Repository<Users> = getRepository(Users);
            let userEdit: Users = await userRepo.findOne({
                where: { userId: id }
            });

            if (!userEdit) {
                console.log(`There is no user with id ${id}`);
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(Users)
                    .where('userId = :id', {id})
                    .execute();

                console.log(`User with id ${id} has been deleted`);
            }
        } catch(err) {
            console.log(err);
        }
    }

    async showDataUsers() {
        try {
            const users: Array<Users> = await this.connection.manager.find(Users);

            Printer.printUsers(users);
        } catch (err) {
            console.log(err);
        }
    }
}