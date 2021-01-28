import { Rate } from '../entity/Rate.js';
import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';

import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';
import { Critique } from '../entity/Critique.js';
import { Game } from '../entity/Game.js';

export class RateService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async addDataRate() {
        try {
            const rate: Rate = Reader.prepareDataRate();
            const crRepo: Repository<Critique> = getRepository(Critique);
            const gameRepo: Repository<Game> = getRepository(Game);

            const crObj: Critique = await crRepo.findOne({
                where: {
                    critique_id: rate.rate_critique_id
                }
            });
            const gameObj: Game = await gameRepo.findOne({
                where: {
                    game_id: rate.rate_game_id
                }
            });

            if (!crObj || !gameObj) {
                console.log(`There is no critique with id ${rate.rate_critique_id} or game with id ${rate.rate_game_id}`);
            } else {
                await this.connection.manager.save(rate);

                console.log('Added 1 row to table Rate');
            }
        } catch (err) {
            console.log(err);
        }
    }

    async editDataRate() {
        try {
            const id: number = +question('rate id: ');
            const rateRepo: Repository<Rate> = getRepository(Rate);

            const rateObj: Rate = await rateRepo.findOne({
                where: {
                    rate_id: id
                }
            });

            if (!rateObj) {
                console.log(`There is no rate with id ${id}`);
            } else {
                const rate: Rate = Reader.prepareDataRate();
                const crRepo: Repository<Critique> = getRepository(Critique);
                const gameRepo: Repository<Game> = getRepository(Game);

                const crObj: Critique = await crRepo.findOne({
                    where: {
                        critique_id: rate.rate_critique_id
                    }
                });
                const gameObj: Game = await gameRepo.findOne({
                    where: {
                        game_id: rate.rate_game_id
                    }
                });

                if (!crObj || !gameObj) {
                    console.log(`There is no critique with id ${rate.rate_critique_id} or game with id ${rate.rate_game_id}`);
                } else {
                    await this.connection
                        .createQueryBuilder()
                        .update(Rate)
                        .set({ ...rate })
                        .where('rate_id = :id', { id })
                        .execute();

                    console.log(`Rate with id ${id} has been updated`);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    async deleteDataRate() {
        try {
            const id: number = +question('rate id: ');
            const rateRepo: Repository<Rate> = getRepository(Rate);

            const rateObj: Rate = await rateRepo.findOne({
                where: {
                    rate_id: id
                }
            });

            if (!rateObj) {
                console.log(`There is no rate with id ${id}`);
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(Rate)
                    .where('rate_id = :id', { id })
                    .execute();

                console.log(`Rate with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async showDataRate() {
        try {
            const rates: Array<Rate> = await this.connection.manager.find(Rate);

            Printer.printRates(rates);
        } catch (err) {
            console.log(err);
        }
    }
}