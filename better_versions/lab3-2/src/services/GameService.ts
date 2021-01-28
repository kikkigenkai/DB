import { Game } from '../entity/Game.js';
import { Creator } from '../entity/Creator.js';
import { Reader } from '../utils/reader.js';

import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';
import { Printer } from '../utils/printer.js';

export class GameService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async addDataGame() {
        try {
            const game: Game = Reader.prepareDataGame();
            const creators: Repository<Creator> = getRepository(Creator);
            const creator: Creator = await creators.findOne({
                where: {
                    creator_id: game.g_cr_id
                }
            });

            if (!creator) {
                console.log(`There is no creator with id ${game.g_cr_id}`);
            } else {
                await this.connection.manager.save(game);

                console.log('Added 1 row to table Game');
            }
        } catch (err) {
            console.log(err);
        }
    }

    async editDataGame() {
        try {
            const id: number = +question('game id: ');
            const games: Repository<Game> = getRepository(Game);
            const gameObj: Game = await games.findOne({
                where: {
                    game_id: id
                }
            });

            if (!gameObj) {
                console.log(`There is no game with id ${id}`);
            } else {
                const game: Game = Reader.prepareDataGame();
                const creators: Repository<Creator> = getRepository(Creator);
                const creator: Creator = await creators.findOne({
                    where: {
                        creator_id: game.g_cr_id
                    }
                });

                if (!creator) {
                    console.log(`There is no creator with id ${game.g_cr_id}`);
                } else {
                    await this.connection
                        .createQueryBuilder()
                        .update(Game)
                        .set({ ...game })
                        .where('game_id = :id', { id })
                        .execute();

                    console.log(`Row with id ${id} has been updated`);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    async deleteDataGame() {
        try {
            const id: number = +question('game id: ');
            const games: Repository<Game> = getRepository(Game);
            const gameObj: Game = await games.findOne({
                where: {
                    game_id: id
                }
            });

            if (!gameObj) {
                console.log(`There is no game with id ${id}`);
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(Game)
                    .where('game_id = :id', { id })
                    .execute();

                console.log(`Row with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async showDataGame() {
        try {
            const games: Array<Game> = await this.connection.manager.find(Game);

            Printer.printGames(games);
        } catch (err) {
            console.log(err);
        }
    }
}