import { Format } from './format.js';

export class Printer {
    static printHires(hires: Array<any>) {
        console.log('hire_id | hire_publisher_id | hire_creator_id');
        console.log('_____________________________________________');

        hires.forEach((item: any) => {
            console.log(`${Format.toField(8, item.hire_id.toString())}|${Format.toField(19, item.hire_publisher_id.toString())}|${Format.toField(16, item.hire_creator_id.toString())}`);
            console.log('_____________________________________________');
        });
    }

    static printRates(rates: Array<any>) {
        console.log('rate_id | rate_game_id | rate_critique_id');
        console.log('_________________________________________');

        rates.forEach((item: any) => {
            console.log(`${Format.toField(8, item.rate_id.toString())}|${Format.toField(14, item.rate_game_id.toString())}|${Format.toField(17, item.rate_critique_id.toString())}`);
            console.log('_________________________________________');
        });
    }

    static printPublishers(publishers: Array<any>) {
        console.log('publisher_id |        pubName       ');
        console.log('____________________________________');

        publishers.forEach((item: any) => {
            let modPName: string = '';

            if (item.pubName.length > 22) {
                modPName = item.pubName.substr(0, 19) + '...';
            } else {
                modPName = Format.toField(22, item.pubName);
            }

            console.log(`${Format.toField(13, item.publisher_id.toString())}|${modPName}`);
            console.log('____________________________________');
        });
    }
    
    static printCritiques(critiques: Array<any>) {
        console.log('critique_id |        qName       ');
        console.log('_________________________________');

        critiques.forEach((item: any) => {
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

    static printCreators(creators: Array<any>) {
        console.log('creator_id |        crName       |    active   ');
        console.log('_______________________________________________');

        creators.forEach((item: any) => {
            let modCName: string = '';

            if (item.crName.length > 21) {
                modCName = item.crName.substr(0, 18) + '...';
            } else {
                modCName = Format.toField(21, item.crName);
            }

            console.log(`${Format.toField(11, item.creator_id.toString())}|${modCName}|${item.active}`);
            console.log('_______________________________________________');
        });
    }

    static printGames(games: Array<any>) {
        console.log('game_id |        gName       |       genre      | price | release_date | g_cr_id');
        console.log('________________________________________________________________________________');

        games.forEach((item: any) => {
            let modGName: string = '';
            let modGenre: string = '';

            if (item.gName.length > 20) {
                modGName = item.gName.substr(0, 17) + '...';
            } else {
                modGName = Format.toField(20, item.gName);
            }

            if (item.genre.length > 18) {
                modGenre = item.genre.substr(0, 15) + '...';
            } else {
                modGenre = Format.toField(18, item.genre);
            }

            console.log(`${Format.toField(8, item.game_id.toString())}|${modGName}|${modGenre}|${Format.toField(7, item.price.toString())}|${Format.formatDate(new Date(item.release_date))}|${item.g_cr_id}`);
            console.log('________________________________________________________________________________');
        });
    }
}