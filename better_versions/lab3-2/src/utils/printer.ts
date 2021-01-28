import { Format } from './format.js';

import { Creator } from '../entity/Creator.js';
import { Game } from '../entity/Game.js';
import { Publisher } from '../entity/Publisher.js';
import { Hire } from '../entity/Hire.js';
import { Critique } from '../entity/Critique.js';
import { Rate } from '../entity/Rate.js';

export class Printer {
    static printRates(rates: Array<Rate>) {
        console.log('rate_id | rate_game_id | rate_critique_id');
        console.log('_________________________________________');

        rates.forEach((item: Rate) => {
            console.log(`${Format.toField(8, item.rate_id.toString())}|${Format.toField(14, item.rate_game_id.toString())}|${Format.toField(17, item.rate_critique_id.toString())}`);
            console.log('_________________________________________');
        });
    }

    static printCritiques(critiques: Array<Critique>) {
        console.log('critique_id |        qName       ');
        console.log('_________________________________');

        critiques.forEach((item: Critique) => {
            let modQName: string = '';

            if (item.qName.length > 20) {
                modQName = item.qName.substr(0, 17) + '...';
            } else {
                modQName = Format.toField(20, item.qName);
            }

            console.log(`${Format.toField(12, item.critique_id.toString())}|${modQName}`);
            console.log('_________________________________');
        });
    }

    static printHires(hires: Array<Hire>) {
        console.log('hire_id | hire_publisher_id | hire_creator_id');
        console.log('_____________________________________________');

        hires.forEach((item: Hire) => {
            console.log(`${Format.toField(8, item.hire_id.toString())}|${Format.toField(19, item.hire_publisher_id.toString())}|${Format.toField(16, item.hire_creator_id.toString())}`);
            console.log('_____________________________________________');
        });
    }

    static printPublishers(pubs: Array<Publisher>) {
        console.log('publisher_id |        pubName      ');
        console.log('___________________________________');

        pubs.forEach((item: Publisher) => {
            let modPName: string = '';

            if (item.pubName.length > 21) {
                modPName = item.pubName.substr(0, 18) + '...';
            } else {
                modPName = Format.toField(21, item.pubName);
            }

            console.log(`${Format.toField(13, item.publisher_id.toString())}|${modPName}`);
            console.log('___________________________________');
        });
    }
    
    static printGames(games: Array<Game>) {
        console.log('game_id |        gName       |     genre    |  price  | release_date | g_cr_id');
        console.log('______________________________________________________________________________');

        games.forEach((item: Game) => {
            let modGName: string = '';
            let modGenre: string = '';

            if (item.gName.length > 20) {
                modGName = item.gName.substr(0, 17) + '...';
            } else {
                modGName = Format.toField(20, item.gName);
            }

            if (item.genre.length > 14) {
                modGenre = item.genre.substr(0, 11) + '...';
            } else {
                modGenre = Format.toField(14, item.genre);
            }

            console.log(`${Format.toField(8, item.game_id.toString())}|${modGName}|${modGenre}|${Format.toField(9, item.price.toString())}|${Format.toField(14, Format.toDate(new Date(item.release_date)))}|${item.g_cr_id}`);
            console.log('______________________________________________________________________________');
        });
    }

    static printCreators(creators: Array<Creator>) {
        console.log('creator_id |        crName       |  active');
        console.log('_____________________________________________');

        creators.forEach((item: Creator) => {
            let modCName: string = '';

            if (item.crName.length > 21) {
                modCName = item.crName.substr(0, 18) + '...';
            } else {
                modCName = Format.toField(21, item.crName);
            }

            console.log(`${Format.toField(11, item.creator_id.toString())}|${modCName}|${item.active}`);
            console.log('_____________________________________________');
        });
    }
}