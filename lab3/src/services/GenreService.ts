import { Genre } from '../entity/Genre.js';
import { Reader } from '../utils/readers.js';
import { Printer } from '../utils/printers.js';

import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';

export class GenreService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async addDataGenre() {
        const genre: Genre = Reader.prepareDataGenre();

        try {
            await this.connection.manager.save(genre);

            console.log(`Genre with name ${genre.g_name} has been saved`);

            return;
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }

    async editDataGenre() {
        const editId: number = +question('id of genre: ');

        try {
            const genreRepo: Repository<Genre> = getRepository(Genre);
            let genre: Genre = await genreRepo.findOne({ where: { genre_id: editId } });
            
            if (!genre) {
                console.log(`There is no genre with id ${editId} in table Genre`);

                return;
            } else {
                genre = Reader.prepareDataGenre();
                await this.connection
                    .createQueryBuilder()
                    .update(Genre)
                    .set({ ...genre })
                    .where('genre_id = :id', { id: editId })
                    .execute();

                console.log(`Genre with id ${editId} has been updated`);

                return;
            }
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }

    async deleteDataGenre() {
        const deleteId: number = +question('id of genre: ');

        try {
            const genreRepo: Repository<Genre> = getRepository(Genre);
            let genre: Genre = await genreRepo.findOne({ where: { genre_id: deleteId } });
            
            if (!genre) {
                console.log(`There is no genre with id ${deleteId} in table Genre`);

                return;
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(Genre)
                    .where('genre_id = :id', { id: deleteId })
                    .execute();

                console.log(`Genre with id ${deleteId} has been deleted`);

                return;
            }
        } catch (err) {
            console.log('Something went wrong');

            return;
        }
    }

    async showDataGenre() {
        try {
            const genres: Genre[] = await this.connection.manager.find(Genre);

            Printer.printGenres(genres);

            return;
        } catch (err) {
            console.log(err);

            return;
        }
    }
}