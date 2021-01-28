import { question } from 'readline-sync';

import { Format } from './format.js';
import { 
    Publisher, 
    Game, 
    Critique, 
    Creator, 
    Hire, 
    Rate 
} from '../types';


export class Reader {
    static prepareDataPublisher(): Publisher {
        const publisher: Publisher = {};

        publisher.pubName = question('publisher name: ');

        return publisher;
    }

    static prepareDataGame(): Game {
        const game: Game = {};

        game.gName = question('game name: ');
        game.genre = question('game genre: ');
        game.price = +question('game price: ');
        game.release_date = Format.formatDate(new Date(Date.now()));
        game.g_cr_id = +question('creator id: ');

        return game;
    }

    static prepareDataCritique(): Critique {
        const critique: Critique = {};

        critique.qName = question('critique name: ');

        return critique;
    }

    static prepareDataCreator(): Creator {
        const creator: Creator = {};

        creator.crName = question('creator name: ');
        creator.active = question('active creator: ') ? true : false;

        return creator;
    }

    static prepareDataHire(): Hire {
        const hire: Hire = {};

        hire.hire_creator_id = +question('creator id: ');
        hire.hire_publisher_id = +question('publisher id: ');

        return hire;
    } 

    static prepareDataRate(): Rate {
        const rate: Rate = {};

        rate.rate_game_id = +question('game id: ');
        rate.rate_critique_id = +question('critique id: ');

        return rate;
    }
}