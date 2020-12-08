import { Anime } from "../entity/Anime.js";
import { Genre } from "../entity/Genre.js";
import { Passport } from "../entity/Passport.js";
import { Review } from "../entity/Review.js";
import { User } from "../entity/User.js";
import { UserPassport } from "../entity/UserPassport.js";
import { Watched } from "../entity/Watched.js";
import { FormatData } from "./format.js";

import { question } from 'readline-sync';

export class Reader {
    static prepareDataAnime(): Anime {
        const anime: Anime = new Anime();

        anime.a_name = question('anime name: ');
        anime.description = question('anime description: ');
        anime.series = +question('anime series: ');
        anime.genre = +question('anime genre id: ');

        return anime;
    }

    static prepareDataGenre(): Genre {
        const genre: Genre = new Genre();

        genre.g_name = question('genre name: ');

        return genre;
    }

    static prepareDataUser(): User {
        const user: User = new User();

        user.username = question('username: ');
        user.registry_date = FormatData.toDate(new Date(Date.now()));

        return user;
    }

    static prepareDataPassport(): Passport {
        const passport: Passport = new Passport();

        passport.name = question('passport name: ');
        passport.surname = question('passport surnamename: ');
        passport.birth_date = question('passport birth date: ');

        return passport;
    }

    static prepareDataReview(): Review {
        const review: Review = new Review();

        review.r_text = question('review text: ');
        review.rev_user_id = +question('review author id: ');
        review.rev_anime_id = +question('review anime id: ');

        return review;
    }

    static prepareDataUserPassport(): UserPassport {
        const userPassport: UserPassport = new UserPassport();

        userPassport.up_passport_id = +question('user passport id: ');
        userPassport.up_user_id = +question('user id: ')

        return userPassport;
    }

    static prepareDataWatched(): Watched {
        const watch: Watched = new Watched();

        watch.watch_anime_id = +question('anime id: ');
        watch.watch_user_id = +question('user id: ')

        return watch;
    }
}