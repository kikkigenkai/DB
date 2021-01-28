import { UsersService } from '../services/UsersService.js';
import { AnswerService } from '../services/AnswerService.js';
import { GoogleProfileService } from '../services/GoogleProfileService.js';
import { QuestionsService } from "../services/QuestionsService.js";
import { TagsService } from "../services/TagsService.js";
import { QTBService } from "../services/QTBService.js";

import { View } from '../view/View.js';

import { Connection } from 'typeorm';
import { question } from 'readline-sync';

export class Controller {
    static async start(connection: Connection) {
        const answer = new AnswerService(connection);
        const user = new UsersService(connection);
        const quest = new QuestionsService(connection);
        const qtb = new QTBService(connection);
        const gp = new GoogleProfileService(connection);
        const tag = new TagsService(connection);

        const tables: Array<string> = ['Answer', 'Google_Profile', 'QuestionTagsBinding', 'Questions', 'Tags', 'Users'];

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
                                await answer.addDataAnswer();
                                break;
                            }
                            case 2: {
                                await answer.editDataAnswer();
                                break;
                            }
                            case 3: {
                                await answer.deleteDataAnswer();
                                break;
                            }
                            case 4: {
                                await answer.showDataAnswer();
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
                                await gp.addDataGP();
                                break;
                            }
                            case 2: {
                                await gp.editDataGP();
                                break;
                            }
                            case 3: {
                                await gp.deleteDataGP();
                                break;
                            }
                            case 4: {
                                await gp.showDataGP();
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
                                await qtb.addDataQTB();
                                break;
                            }
                            case 2: {
                                await qtb.editDataQTB();
                                break;
                            }
                            case 3: {
                                await qtb.deleteDataQTB();
                                break;
                            }
                            case 4: {
                                await qtb.showDataQTB();
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
                                await quest.addDataQuestions();
                                break;
                            }
                            case 2: {
                                await quest.editDataQuestions();
                                break;
                            }
                            case 3: {
                                await quest.deleteDataQuestions();
                                break;
                            }
                            case 4: {
                                await quest.showDataQuestions();
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
                                await tag.addDataTags();
                                break;
                            }
                            case 2: {
                                await tag.editDataTags();
                                break;
                            }
                            case 3: {
                                await tag.deleteDataTags();
                                break;
                            }
                            case 4: {
                                await tag.showDataTags();
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
                                await user.addDataUsers();
                                break;
                            }
                            case 2: {
                                await user.editDataUsers();
                                break;
                            }
                            case 3: {
                                await user.deleteDataUsers();
                                break;
                            }
                            case 4: {
                                await user.showDataUsers();
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