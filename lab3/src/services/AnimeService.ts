import { Anime } from '../entity/Anime.js';
import { Reader } from '../utils/readers.js';
import { Printer } from '../utils/printers.js';

import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';

export class AnimeService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async addDataAnime() {
        const anime: Anime = Reader.prepareDataAnime();

        try {
            await this.connection.manager.save(anime);

            console.log(`Anime with name ${anime.a_name} has been saved`);

            return;
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }

    async editDataAnime() {
        const editId: number = +question('Anime id: ');

        try {
            const animeRepo: Repository<Anime> = getRepository(Anime);
            let anime: Anime = await animeRepo.findOne({ where: { anime_id: editId } });

            if (!anime) {
                console.log(`There is no anime with id ${editId} in table Anime`);

                return;
            } else {
                anime = Reader.prepareDataAnime();
                await this.connection
                    .createQueryBuilder()
                    .update(Anime)
                    .set({ ...anime })
                    .where('anime_id = :id', { id: editId })
                    .execute();
                
                console.log(`Anime with id ${editId} has been updated`);

                return;
            }
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }

    async deleteDataAnime() {
        const deleteId: number = +question('id of anime for deleting: ');

        try {
            const animeRepo: Repository<Anime> = getRepository(Anime);
            let anime: Anime = await animeRepo.findOne({ where: { anime_id: deleteId } });

            if (!anime) {
                console.log(`There is no anime with id ${deleteId} in table Anime`);

                return;
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(Anime)
                    .where('anime_id = :id', { id: deleteId })
                    .execute();

                console.log(`Anime with id ${deleteId} has been deleted`);

                return;
            }
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }

    async showDataAnime() {
        try {
            const animes: Anime[] = await this.connection.manager.find(Anime);

            Printer.printAnimes(animes);

            return;
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }
}