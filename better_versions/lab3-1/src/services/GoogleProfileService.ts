import { GoogleProfile } from '../entity/GoogleProfile.js';
import { Users } from '../entity/Users.js';
import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';

import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';

export class GoogleProfileService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async addDataGP() {
        const gp: GoogleProfile = Reader.prepareDataGoogleProfile();

        try {
            await this.connection.manager.save(gp);

            console.log(`GP with id ${gp.gpId} has been saved`);
        } catch (err) {
            console.log(err);
        }
    }

    async editDataGP() {
        const id: number = +question('GP id: ');

        try {
            const newGp: GoogleProfile = Reader.prepareDataGoogleProfile();
            const gpRepo: Repository<GoogleProfile> = getRepository(GoogleProfile);
            const userRepo: Repository<Users> = getRepository(Users);

            const gp: GoogleProfile = await gpRepo.findOne({
                where: { gpId: id }
            });

            if (!gp) {
                console.log(`There is no GP with id ${id}`);
            } else {
                const user: Users = await userRepo.findOne({
                    where: { userId: newGp.questionUser }
                });

                if (!user) {
                    console.log(`There is no user with id ${id}`);
                } else {
                    await this.connection
                        .createQueryBuilder()
                        .update(GoogleProfile)
                        .set({ ...newGp })
                        .where('gpId = :id', { id })
                        .execute();

                    console.log(`GP with id ${id} has been updated`);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    async deleteDataGP() {
        const id: number = +question('GP id: ');

        try {
            const gpRepo: Repository<GoogleProfile> = getRepository(GoogleProfile);

            const gp: GoogleProfile = await gpRepo.findOne({
                where: { gpId: id }
            });

            if (!gp) {
                console.log(`There is no GP with id ${id}`);
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(GoogleProfile)
                    .where('gpId = :id', { id })
                    .execute();

                console.log(`GP with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async showDataGP() {
        try {
            const gps: Array<GoogleProfile> = await this.connection.manager.find(GoogleProfile);

            Printer.printGoogleProfiles(gps);
        } catch (err) {
            console.log(err);
        }
    }
}