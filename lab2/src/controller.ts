const View = require('./view');
const Model = require('./model');

namespace TablesDB {
    const readLineSync = require('readline-sync');

    const tables: Array<string> = ['Genre', 'Anime', 'User', 'Passport', 'Review'];
    let currentTable: string = '';

    class Controller {
        static start(): void {
            console.log('Type home to start');

            readLineSync.promptCLLoop({
                home: (): void => {
                    currentTable = '';
                    View.mainMenu();
                },
                table: (tname: string): void => {
                    if (tables.find(item => item === tname)) {
                        currentTable = tname;
                        View.actionWithTable(currentTable);
                    } else {
                        console.log(`There is no ${tname} table`);
                    }
                },
                add: (): void => {
                    if (currentTable) {
                        switch (currentTable.toLowerCase()) {
                            case 'anime': {
                                const newAnimeRow: Anime = Model.addDataAnime();
                                console.log(newAnimeRow);
                                break;
                            }
                            case 'genre': {
                                const newGenreRow: Genre = Model.addDataGenre();
                                console.log(newGenreRow);
                                break;
                            }
                            case 'passport': {
                                const newPassportRow: Passport = Model.addDataPassport();
                                console.log(newPassportRow);
                                break;
                            }
                            case 'review': {
                                const newReviewRow: Review = Model.addDataReview();
                                console.log(newReviewRow);
                                break;
                            }
                            case 'user': {
                                const newUserRow: User = Model.addDataUser();
                                console.log(newUserRow);
                                break;
                            }
                            case 'user_passport': {
                                const newUserPassportRow: User_Passport = Model.addDataUserPassport();
                                console.log(newUserPassportRow);
                                break;
                            }
                            case 'watched': {
                                const newWatchedRow: Watched = Model.addDataWatched();
                                console.log(newWatchedRow);
                                break;
                            }
                        }
                    } else {
                        console.log('No table selected');
                    }
                },
                q: (): boolean  => {
                    return true;
                }
            });
        }
    }

    module.exports = Controller;
}