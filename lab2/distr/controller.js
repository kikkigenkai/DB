"use strict";
const View = require('./view');
const Model = require('./model');
var TablesDB;
(function (TablesDB) {
    const readLineSync = require('readline-sync');
    const tables = ['Genre', 'Anime', 'User', 'Passport', 'Review'];
    let currentTable = '';
    class Controller {
        static start() {
            console.log('Type home to start');
            readLineSync.promptCLLoop({
                home: () => {
                    currentTable = '';
                    View.mainMenu();
                },
                table: (tname) => {
                    if (tables.find(item => item === tname)) {
                        currentTable = tname;
                        View.actionWithTable(currentTable);
                    }
                    else {
                        console.log(`There is no ${tname} table`);
                    }
                },
                add: () => {
                    if (currentTable) {
                        switch (currentTable.toLowerCase()) {
                            case 'anime': {
                                const newAnimeRow = Model.addDataAnime();
                                console.log(newAnimeRow);
                                break;
                            }
                            case 'genre': {
                                const newGenreRow = Model.addDataGenre();
                                console.log(newGenreRow);
                                break;
                            }
                            case 'passport': {
                                const newPassportRow = Model.addDataPassport();
                                console.log(newPassportRow);
                                break;
                            }
                            case 'review': {
                                const newReviewRow = Model.addDataReview();
                                console.log(newReviewRow);
                                break;
                            }
                            case 'user': {
                                const newUserRow = Model.addDataUser();
                                console.log(newUserRow);
                                break;
                            }
                            case 'user_passport': {
                                const newUserPassportRow = Model.addDataUserPassport();
                                console.log(newUserPassportRow);
                                break;
                            }
                            case 'watched': {
                                const newWatchedRow = Model.addDataWatched();
                                console.log(newWatchedRow);
                                break;
                            }
                        }
                    }
                    else {
                        console.log('No table selected');
                    }
                },
                q: () => {
                    return true;
                }
            });
        }
    }
    module.exports = Controller;
})(TablesDB || (TablesDB = {}));
