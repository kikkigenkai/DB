import { RateService } from '../services/RateService.js';
import { CreatorService } from '../services/CreatorService.js';
import { CritiqueService } from '../services/CritiqueService.js';
import { HireService } from "../services/HireService.js";
import { PublisherService } from "../services/PublisherService.js";
import { GameService } from "../services/GameService.js";

import { View } from '../view/View.js';

import { Connection } from 'typeorm';
import { question } from 'readline-sync';

export class Controller {
    static async start(connection: Connection) {
        const rate: RateService = new RateService(connection);
        const creator: CreatorService = new CreatorService(connection);
        const critique: CritiqueService = new CritiqueService(connection);
        const hire: HireService = new HireService(connection);
        const publisher: PublisherService = new PublisherService(connection);
        const game: GameService = new GameService(connection);

        const tables: Array<string> = ['Creator', 'Critique', 'Game', 'Hire', 'Publisher', 'Rate'];

        while (true) {
            View.mainMenu();
            let table: number = +question('input: ');

            if (table < 1 || table > 6) {
                return;
            } else {
                View.actionWithTable(tables[table - 1]);

                switch (table) {
                    case 1: {
                        let action: number = +question('input: ');

                        switch (action) {
                            case 1: {
                                await creator.addDataCreator();
                                break;
                            }
                            case 2: {
                                await creator.editDataCreator();
                                break;
                            }
                            case 3: {
                                await creator.deleteDataCreator();
                                break;
                            }
                            case 4: {
                                await creator.showDataCreator();
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
                                await critique.addDataCritique();
                                break;
                            }
                            case 2: {
                                await critique.editDataCritique();
                                break;
                            }
                            case 3: {
                                await critique.deleteDataCritique();
                                break;
                            }
                            case 4: {
                                await critique.showDataCritique();
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
                                await game.addDataGame();
                                break;
                            }
                            case 2: {
                                await game.editDataGame();
                                break;
                            }
                            case 3: {
                                await game.deleteDataGame();
                                break;
                            }
                            case 4: {
                                await game.showDataGame();
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
                                await hire.addDataHire();
                                break;
                            }
                            case 2: {
                                await hire.editDataHire();
                                break;
                            }
                            case 3: {
                                await hire.deleteDataHire();
                                break;
                            }
                            case 4: {
                                await hire.showDataHire();
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
                                await publisher.addDataPublisher();
                                break;
                            }
                            case 2: {
                                await publisher.editDataPublisher();
                                break;
                            }
                            case 3: {
                                await publisher.deleteDataPublisher();
                                break;
                            }
                            case 4: {
                                await publisher.showDataPublisher();
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
                                await rate.addDataRate();
                                break;
                            }
                            case 2: {
                                await rate.editDataRate();
                                break;
                            }
                            case 3: {
                                await rate.deleteDataRate();
                                break;
                            }
                            case 4: {
                                await rate.showDataRate();
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