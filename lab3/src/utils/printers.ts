import { Anime } from "../entity/Anime.js";
import { Genre } from "../entity/Genre.js";
import { Passport } from "../entity/Passport.js";
import { Review } from "../entity/Review.js";
import { User } from "../entity/User.js";
import { UserPassport } from "../entity/UserPassport.js";
import { Watched } from "../entity/Watched.js";
import { FormatData } from "./format.js";

export class Printer {
    static printUsers(users: User[]) {
        console.log('user_id |        username       |  registry_date  | confirmed');
        console.log('_____________________________________________________________');

        users.forEach((item: User) => {
            let modUName: string = '';

            if (item.username.length > 23) {
                modUName = item.username.substr(0, 20) + '...';
            } else {
                modUName = FormatData.toField(23, item.username);
            }

            console.log(`${FormatData.toField(8, item.user_id.toString())}|${modUName}|${FormatData.toField(17, FormatData.toDate(new Date(item.registry_date)))}|${item.confirmed}`);
            console.log('_____________________________________________________________');
        });
    }

    static printAnimes(animes: Anime[]) {
        console.log('anime_id |     a_name     |          description          | series | genre');
        console.log('__________________________________________________________________________');

        animes.forEach((item: Anime) => {
            let modName: string = '';
            let modDescr: string = '';

            if (item.a_name.length > 16) {
                modName = item.a_name.substr(0, 13) + '...';
            } else {
                modName = FormatData.toField(16, item.a_name);
            }

            if (item.description.length > 31) {
                modDescr = item.description.substr(0, 28) + '...';
            } else {
                modDescr = FormatData.toField(31, item.description);
            }

            console.log(`${FormatData.toField(9, item.anime_id.toString())}|${modName}|${modDescr}|${FormatData.toField(8, item.series.toString())}|${item.genre}`);
            console.log('__________________________________________________________________________');
        });
    }

    static printGenres(genres: Genre[]) {
        console.log('genre_id |        g_name       ');
        console.log('_______________________________');

        genres.forEach((item: Genre) => {
            let modGName: string = '';

            if (item.g_name.length > 21) {
                modGName = item.g_name.substr(0, 18) + '...';
            } else {
                modGName = FormatData.toField(21, item.g_name);
            }

            console.log(`${FormatData.toField(9, item.genre_id.toString())}|${modGName}`);
            console.log('_______________________________');
        });
    }

    static printPassports(passports: Passport[]) {
        console.log('passport_id |        name       |        surname       |  birth_date ');
        console.log('_____________________________________________________________________');

        passports.forEach((item: any) => {
            let modName: string = '';
            let modSurname: string = '';

            if (item.name.length > 19) {
                modName = item.name.substr(0, 16) + '...';
            } else {
                modName = FormatData.toField(19, item.name);
            }

            if (item.surname.length > 22) {
                modSurname = item.surname.substr(0, 19) + '...';
            } else {
                modSurname = FormatData.toField(22, item.surname);
            }

            console.log(`${FormatData.toField(12, item.passport_id.toString())}|${modName}|${modSurname}|${FormatData.toDate(item.birth_date)}`);
            console.log('_____________________________________________________________________');
        });
    }

    static printWatches(watches: Watched[]) {
        console.log('a_watched_id | watch_anime_id | watch_user_id');
        console.log('_____________________________________________');

        watches.forEach((item: Watched) => {
            console.log(`${FormatData.toField(13, item.a_watched_id.toString())}|${FormatData.toField(16, item.watch_anime_id.toString())}|${item.watch_user_id}`);
            console.log('_____________________________________________');
        });
    }

    static printReviews(reviews: Review[]) {
        console.log('review_id |        r_text       |    rev_user_id    |  rev_anime_id ');
        console.log('____________________________________________________________________');

        reviews.forEach((item: Review) => {
            let modRText: string = '';

            if (item.r_text.length > 21) {
                modRText = item.r_text.substr(0, 18) + '...';
            } else {
                modRText = FormatData.toField(21, item.r_text);
            }

            console.log(`${FormatData.toField(10, item.review_id.toString())}|${modRText}|${FormatData.toField(19, item.rev_user_id.toString())}|${item.rev_anime_id}`);
            console.log('____________________________________________________________________');
        });
    }

    static printUserPassports(userPassports: UserPassport[]) {
        console.log('user_passport_id |  up_user_id  |  up_passport_id');
        console.log('_________________________________________________');

        userPassports.forEach((item: UserPassport) => {            
            console.log(`${FormatData.toField(17, item.user_passport_id.toString())}|${FormatData.toField(14, item.up_user_id.toString())}|${item.up_passport_id}`);
            console.log('_________________________________________________');
        });
    }
}