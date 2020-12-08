import { Watched } from '../entity/Watched.js';
import { User } from '../entity/User.js';
import { Reader } from '../utils/readers.js';
import { Printer } from '../utils/printers.js';

import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';
import { throws } from 'assert';
import { Anime } from '../entity/Anime.js';

export class WatchedService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async addDataWatched() {
        const watch: Watched = Reader.prepareDataWatched();

        try {
            const userRepo: Repository<User> = getRepository(User);
            const animeRepo: Repository<Anime> = getRepository(Anime);
            
            const userRow: User = await userRepo.findOne({
                where: { user_id: watch.watch_user_id }
            });
            const animeRow: Anime = await animeRepo.findOne({
                where: { anime_id: watch.watch_anime_id }
            });
                
            if (!userRow || !animeRow) {
                console.log(`There is no user with id ${watch.watch_user_id} or anime with id ${watch.watch_anime_id} in database`);

                return;
            } else {
                await this.connection.manager.save(watch);

                console.log(`Added 1 element to table Watched`);

                return;
            }
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }

    async editDataWatched() {
        const editId: number = +question('Watch id: ');

        try {
            const watchRepo: Repository<Watched> = getRepository(Watched);
            const watchEdit: Watched = await watchRepo.findOne({
                where: {
                    a_watched_id: editId
                }
            });

            if (!watchEdit) {
                console.log(`There is no watch with id ${editId} in database`);

                return;
            } else {
                const watch: Watched = Reader.prepareDataWatched();
                const userRepo: Repository<User> = getRepository(User);
                const animeRepo: Repository<Anime> = getRepository(Anime);
                
                const userRow: User = await userRepo.findOne({
                    where: { user_id: watch.watch_user_id }
                });
                const animeRow: Anime = await animeRepo.findOne({
                    where: { anime_id: watch.watch_anime_id }
                });

                if (!userRow || !animeRow) {
                    console.log(`There is no user id ${watch.watch_user_id} or anime id ${watch.watch_anime_id} in database`);

                    return;
                } else {
                    await this.connection
                        .createQueryBuilder()
                        .update(Watched)
                        .set({ ...watch })
                        .where('a_watched_id = :id', { id: editId })
                        .execute();

                    console.log(`Watch with id ${editId} has been updated`);

                    return;
                }
            }
        } catch (err) {
            console.log('Something went wrong');

            return;
        } 
    }

    async deleteDataWatched() {
        const deleteId: number = +question('Watch id: ');

        try {
            const watchRepo: Repository<Watched> = getRepository(Watched);
            const watch: Watched = await watchRepo.findOne({
                where: {
                    a_watched_id: deleteId
                }
            });

            if (!watch) {
                console.log(`There is no watch id ${deleteId} in database`);

                return;
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(Watched)
                    .where('a_watched_id = :id', { id: deleteId })
                    .execute();

                console.log(`Watch with id ${deleteId} has been deleted`);

                return;
            }

        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }

    async showDataWatched() {
        try {
            const watches: Watched[] = await this.connection.manager.find(Watched);

            Printer.printWatches(watches);

            return;
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }
}