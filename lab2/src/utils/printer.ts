import { Format } from './format.js';

export class Printer {
    static printDataAnime(animes: Array<any>) {
        if (animes.length === 0) {
            console.log('Table anime is empty');
        } else {
            console.log('anime_id |     a_name     |          description          | series | genre');
            console.log('__________________________________________________________________________');

            animes.forEach((item: any) => {
                let modName: string = '';
                let modDescr: string = '';

                if (item.a_name.length > 16) {
                    modName = item.a_name.substr(0, 13) + '...';
                } else {
                    modName = Format.toField(16, item.a_name);
                }

                if (item.description.length > 31) {
                    modDescr = item.description.substr(0, 28) + '...';
                } else {
                    modDescr = Format.toField(31, item.description);
                }

                console.log(`${Format.toField(9, item.anime_id.toString())}|${modName}|${modDescr}|${Format.toField(8, item.series.toString())}|${item.genre}`);
                console.log('__________________________________________________________________________');
            });
        }
    }

    
}