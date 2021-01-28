import { question } from 'readline-sync';
import { Format } from './format.js';
import {
    Anime,
    Watched,
    Review,
    Genre,
    User,
    UserPassport,
    Passport
} from './types.js';

export class Reader {
    static prepareDataUserPassport(): UserPassport {
        const upRow: UserPassport = {};

        upRow.up_passport_id = +question('passport id: ');
        upRow.up_user_id = +question('user id: ');

        return upRow;
    }

    static prepareDataWatched(): Watched {
        const watchedRow: Watched = {};

        watchedRow.watch_anime_id = +question('watch anime id: ');
        watchedRow.watch_user_id = +question('watch user id: ');

        return watchedRow;
    }

    static prepareDataReview(): Review {
        const reviewRow: Review = {};

        reviewRow.r_text = question('review text: ');
        reviewRow.rev_anime_id = +question('review anime id: ');
        reviewRow.rev_user_id = +question('review user id: ');

        return reviewRow;
    }

    static prepareDataPassport(): Passport {
        const passportRow: Passport = {};

        passportRow.name = question('passport name: ');
        passportRow.surname = question('passport surname: ');
        passportRow.birth_date = question('birth date: ');

        return passportRow;
    }

    static prepareDataUser(): User {
        const userRow: User = {};

        userRow.username = question('username: ');
        userRow.registry_date = Format.toDate(new Date(Date.now()));

        return userRow;
    }

    static prepareDataGenre(): Genre {
        const genreRow: Genre = {};
        
        genreRow.g_name = question('genre name: ');
            
        return genreRow;
    }

    static prepareDataAnime(): Anime {
        const animeRow: Anime = {};

        animeRow.a_name = question('anime name: ');
        animeRow.description = question('anime description: ');
        animeRow.series = +question('anime series: ');
        animeRow.genre = +question('anime genre id: ');
            
        return animeRow;
    }
}