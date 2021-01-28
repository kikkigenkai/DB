import { CreatorModel } from '../models/creator.js';
import { CritiqueModel } from '../models/critique.js';
import { GameModel } from '../models/game.js';
import { HireModel } from '../models/hire.js';
import { PublisherModel } from '../models/publisher.js';
import { RateModel } from '../models/rate.js';
import { DynamicQueries } from '../models/dynamicQueries.js'
import { Generate } from '../models/generator.js';
import { View } from '../view/view.js';

import { question } from 'readline-sync';

export class Controller {
    static async start() {
        const tables: Array<string> = [
            'Creator',
            'Critique',
            'Game',
            'Hire',
            'Publisher',
            'Rate'
        ];

        while (true) {
            View.mainMenu();
            let table: number = + question('input: ');

            if (table < 1 || table > 9) {
                return;
            } else {
                if (table <= 6) {
                    View.actionWithTable(tables[table - 1]);

                    switch (table) {
                        case 1: {
                            let action: number = +question('input: ');

                            switch (action) {
                                case 1: {
                                    await CreatorModel.addDataCreator();
                                    break;
                                }
                                case 2: {
                                    await CreatorModel.editDataCreator();
                                    break;
                                }
                                case 3: {
                                    await CreatorModel.deleteDataCreator();
                                    break;
                                }
                                case 4: {
                                    await CreatorModel.showDataCreator();
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
                                    await CritiqueModel.addDataCritique();
                                    break;
                                }
                                case 2: {
                                    await CritiqueModel.editDataCritique();
                                    break;
                                }
                                case 3: {
                                    await CritiqueModel.deleteDataCritique();
                                    break;
                                }
                                case 4: {
                                    await CritiqueModel.showDataCritique();
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
                                    await GameModel.addDataGame();
                                    break;
                                }
                                case 2: {
                                    await GameModel.editDataGame();
                                    break;
                                }
                                case 3: {
                                    await GameModel.deleteDataGame();
                                    break;
                                }
                                case 4: {
                                    await GameModel.showDataGame();
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
                                    await HireModel.addDataHire();
                                    break;
                                }
                                case 2: {
                                    await HireModel.editDataHire();
                                    break;
                                }
                                case 3: {
                                    await HireModel.deleteDataHire();
                                    break;
                                }
                                case 4: {
                                    await HireModel.showDataHire();
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
                                    await PublisherModel.addDataPublisher();
                                    break;
                                }
                                case 2: {
                                    await PublisherModel.editDataPublisher();
                                    break;
                                }
                                case 3: {
                                    await PublisherModel.deleteDataPublisher();
                                    break;
                                }
                                case 4: {
                                    await PublisherModel.showDataPublisher();
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
                                    await RateModel.addDataRate();
                                    break;
                                }
                                case 2: {
                                    await RateModel.editDataRate();
                                    break;
                                }
                                case 3: {
                                    await RateModel.deleteDataRate();
                                    break;
                                }
                                case 4: {
                                    await RateModel.showDataRate();
                                    break;
                                }
                                default: {
                                    break;
                                }
                            }

                            break;
                        }
                    }
                } else {
                    switch (table) {
                        case 7: {
                            await Generate.generateGames();
                            break;
                        }
                        case 8: {
                            View.dynamicSearchMenu();

                            let type: number = +question('input: ');

                            switch (type) {
                                case 1: {
                                    await DynamicQueries.specPub();
                                    break;
                                }
                                case 2: {
                                    await DynamicQueries.gamesByCr();
                                    break;
                                }
                                case 3: {
                                    await DynamicQueries.topCrit();
                                    break;
                                }
                                default: {
                                    break;
                                }
                            }
                        }
                        default: {
                            break;
                        }
                    }
                } 
            }
        }
    }
}

