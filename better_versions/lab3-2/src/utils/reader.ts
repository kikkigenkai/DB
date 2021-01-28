import { question } from 'readline-sync';

import { Format } from './format.js';

import { Creator } from '../entity/Creator.js';
import { Game } from '../entity/Game.js';
import { Publisher } from '../entity/Publisher.js';
import { Hire } from '../entity/Hire.js';
import { Critique } from '../entity/Critique.js';
import { Rate } from '../entity/Rate.js';


export class Reader {
    static prepareDataRate(): Rate {
        const rate: Rate = new Rate();

        rate.rate_game_id = +question('rate game id: ');
        rate.rate_critique_id = +question('rate critique id: ');

        return rate;
    }

    static prepareDataCritique(): Critique {
        const critique: Critique = new Critique();

        critique.qName = question('critique name: ');

        return critique;
    }

    static prepareDataHire(): Hire {
        const hire: Hire = new Hire();

        hire.hire_creator_id = +question('creator id: ');
        hire.hire_publisher_id = +question('publisher id: ');

        return hire;
    }

    static prepareDataPublisher(): Publisher {
        const publisher: Publisher = new Publisher();

        publisher.pubName = question('publisher name: ');

        return publisher;
    }

    static prepareDataGame(): Game {
        const game: Game = new Game();

        game.gName = question('game name: ');
        game.genre = question('game genre: ');
        game.price = +question('game price: ');
        game.release_date = Format.toDate(new Date(Date.now()));
        game.g_cr_id = +question('game creator: ');

        return game;
    }

    static prepareDataCreator(): Creator {
        const cr: Creator = new Creator();

        cr.crName = question('creator name: ');
        cr.active = question('creator active: ') ? true : false;

        return cr;
    }
}