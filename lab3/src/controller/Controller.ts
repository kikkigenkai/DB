import { UserService } from '../services/UserService.js';
import { AnimeService } from '../services/AnimeService.js';
import { GenreService } from '../services/GenreService.js';
import { WatchedService } from "../services/WatchedService.js";
import { ReviewService } from "../services/ReviewService.js";
import { UserPassportService } from "../services/UserPassportService.js";
import { PassportService } from "../services/PassportService.js";

import { View } from '../view/View.js';

import { Connection } from 'typeorm';
import { promptCLLoop, question } from 'readline-sync';

export class Controller {
    static async start(connection: Connection) {
        const anime = new AnimeService(connection);
        const user = new UserService(connection);
        const genre = new GenreService(connection);
        const watched = new WatchedService(connection);
        const review = new ReviewService(connection);
        const passport = new PassportService(connection);
        const userPassport = new UserPassportService(connection);

        const tables: Array<string> = ['Genre', 'Anime', 'User', 'Passport', 'Review', 'User_Passport', 'Watched'];

        while (true) {
            View.mainMenu();
            let table: number = +question('input: ');

            if (table < 1 || table > 7) {
                return;
            } else {
                View.actionWithTable(tables[table - 1]);

                switch (table) {
                    case 1: {
                        let action: number = +question('input: ');

                        switch (action) {
                            case 1: {
                                await genre.addDataGenre();
                                break;
                            }
                            case 2: {
                                await genre.editDataGenre();
                                break;
                            }
                            case 3: {
                                await genre.deleteDataGenre();
                                break;
                            }
                            case 4: {
                                await genre.showDataGenre();
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        
                        break;
                    }
                    case 2: {
                        let action: number = +question('input: ');

                        switch (action) {
                            case 1: {
                                await anime.addDataAnime();
                                break;
                            }
                            case 2: {
                                await anime.editDataAnime();
                                break;
                            }
                            case 3: {
                                await anime.deleteDataAnime();
                                break;
                            }
                            case 4: {
                                await anime.showDataAnime();
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        
                        break;
                    }
                    case 3: {
                        let action: number = +question('input: ');

                        switch (action) {
                            case 1: {
                                await user.addDataUser();
                                break;
                            }
                            case 2: {
                                await user.editDataUser();
                                break;
                            }
                            case 3: {
                                await user.deleteDataUser();
                                break;
                            }
                            case 4: {
                                await user.showDataUser();
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        
                        break;
                    }
                    case 4: {
                        let action: number = +question('input: ');

                        switch (action) {
                            case 1: {
                                await passport.addDataPassport();
                                break;
                            }
                            case 2: {
                                await passport.editDataPassport();
                                break;
                            }
                            case 3: {
                                await passport.deleteDataPassport();
                                break;
                            }
                            case 4: {
                                await passport.showDataPassport();
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        
                        break;
                    }
                    case 5: {
                        let action: number = +question('input: ');

                        switch (action) {
                            case 1: {
                                await review.addDataReview();
                                break;
                            }
                            case 2: {
                                await review.editDataReview();
                                break;
                            }
                            case 3: {
                                await review.deleteDataReview();
                                break;
                            }
                            case 4: {
                                await review.showDataReview();
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        
                        break;
                    }
                    case 6: {
                        let action: number = +question('input: ');

                        switch (action) {
                            case 1: {
                                await userPassport.addDataUserPassport();
                                break;
                            }
                            case 2: {
                                await userPassport.editDataUserPassport();
                                break;
                            }
                            case 3: {
                                await userPassport.deleteDataUserPassport();
                                break;
                            }
                            case 4: {
                                await userPassport.showDataUserPassport();
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        
                        break;
                    }
                    case 7: {
                        let action: number = +question('input: ');

                        switch (action) {
                            case 1: {
                                await watched.addDataWatched();
                                break;
                            }
                            case 2: {
                                await watched.editDataWatched();
                                break;
                            }
                            case 3: {
                                await watched.deleteDataWatched();
                                break;
                            }
                            case 4: {
                                await watched.showDataWatched();
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        
                        break;
                    }
                    default: {
                        return;
                    }
                }
            }
        }
    }
}