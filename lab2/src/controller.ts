const View = require('./view');
const {Model, client} = require('./model');

namespace TablesDB {
    const readLineSync = require('readline-sync');

    const tables: Array<string> = ['Genre', 'Anime', 'User', 'Passport', 'Review', 'User_Passport', 'Watched'];
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
                add: async () => {
                    if (currentTable) {
                        switch (currentTable.toLowerCase()) {
                            case 'anime': {
                                const newRow: Anime = Model.prepareDataAnime();
                                await Model.addDataAnime(newRow);
                                currentTable = '';
                                break;
                            }
                            case 'genre': {
                                const newRow: Genre = Model.prepareDataGenre();
                                await Model.addDataGenre(newRow);
                                currentTable = '';
                                break;
                            }
                            case 'passport': {
                                const newRow: Passport = Model.prepareDataPassport();
                                await Model.addDataPassport(newRow);
                                currentTable = '';
                                break;
                            }
                            case 'review': {
                                const newRow: Review = Model.prepareDataReview();
                                await Model.addDataReview(newRow);
                                currentTable = '';
                                break;
                            }
                            case 'user': {
                                const newRow: User = Model.prepareDataUser();
                                await Model.addDataUser(newRow);
                                currentTable = '';
                                break;
                            }
                            case 'user_passport': {
                                const newRow: User_Passport = Model.prepareDataUserPassport();
                                await Model.addDataUserPassport(newRow);
                                currentTable = '';
                                break;
                            }
                            case 'watched': {
                                const newRow: Watched = Model.prepareDataWatched();
                                await Model.addDataWatched(newRow);
                                currentTable = '';
                                break;
                            }
                        }
                    } else {
                        console.log('No table selected');
                        return true;
                    }
                },
                edit: async () => {
                    if (currentTable) {
                        switch (currentTable.toLowerCase()) {
                            case 'anime': {
                                Model.editDataAnime();
                                currentTable = '';
                                break;
                            }
                            case 'genre': {
                                Model.editDataGenre();
                                currentTable = '';
                                break;
                            }
                            case 'passport': {
                                Model.editDataPassport();
                                currentTable = '';
                                break;
                            }
                            case 'review': {
                                Model.editDataReview();
                                currentTable = '';
                                break;
                            }
                            case 'user': {
                                Model.editDataUser();
                                currentTable = '';
                                break;
                            }
                            case 'user_passport': {
                                Model.editDataUserPassport();
                                currentTable = '';
                                break;
                            }
                            case 'watched': {
                                Model.editDataWatched();
                                currentTable = '';
                                break;
                            }
                        }
                    } else {
                        console.log('No table selected');
                        return true;
                    }
                },
                remove: async () => {
                    if (currentTable) {
                        switch (currentTable.toLowerCase()) {
                            case 'anime': {
                                Model.deleteDataAnime();
                                currentTable = '';
                                break;
                            }
                            case 'genre': {
                                Model.deleteDataGenre();
                                currentTable = '';
                                break;
                            }
                            case 'passport': {
                                Model.deleteDataPassport();
                                currentTable = '';
                                break;
                            }
                            case 'review': {
                                Model.deleteDataReview();
                                currentTable = '';
                                break;
                            }
                            case 'user': {
                                Model.deleteDataUser();
                                currentTable = '';
                                break;
                            }
                            case 'user_passport': {
                                Model.deleteDataUserPassport();
                                currentTable = '';
                                break;
                            }
                            case 'watched': {
                                Model.deleteDataWatched();
                                currentTable = '';
                                break;
                            }
                        }
                    } else {
                        console.log('No table selected');
                        return true;
                    }
                },
                show: async () => {
                    if (currentTable) {
                        switch (currentTable.toLowerCase()) {
                            case 'anime': {
                                Model.showDataAnime();
                                currentTable = '';
                                break;
                            }
                            case 'genre': {
                                Model.showDataGenre();
                                currentTable = '';
                                break;
                            }
                            case 'passport': {
                                Model.showDataPassport();
                                currentTable = '';
                                break;
                            }
                            case 'review': {
                                Model.showDataReview();
                                currentTable = '';
                                break;
                            }
                            case 'user': {
                                Model.showDataUser();
                                currentTable = '';
                                break;
                            }
                            case 'user_passport': {
                                Model.showDataUserPassport();
                                currentTable = '';
                                break;
                            }
                            case 'watched': {
                                Model.showDataWatched();
                                currentTable = '';
                                break;
                            }
                        }
                    } else {
                        console.log('No table selected');
                        return true;
                    }
                },
                q: () => {
                    return true;
                }
            });
        }
    }

    module.exports = Controller;
}