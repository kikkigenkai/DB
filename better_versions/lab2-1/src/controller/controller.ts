import { QuestionModel } from '../models/question.js';
import { AnswerModel } from '../models/answer.js';
import { QuestionTagBindingModel } from '../models/questionTagBinding.js';
import { UserModel } from '../models/user.js';
import { GoogleProfileModel } from '../models/googleProfile.js';
import { TagModel } from '../models/tag.js';
import { DynamicQueries } from '../models/dynamicQueries.js'
import { Generate } from '../models/generator.js';
import { View } from '../view/view.js';

import { question } from 'readline-sync';

export class Controller {
    static async start() {
        const tables: Array<string> = [
            'Answer',
            'Google_Profile',
            'QuestionTagsBinding',
            'Questions',
            'Tags',
            'Users'
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
                                    await AnswerModel.addDataAnswer();
                                    break;
                                }
                                case 2: {
                                    await AnswerModel.editDataAnswer();
                                    break;
                                }
                                case 3: {
                                    await AnswerModel.deleteDataAnswer();
                                    break;
                                }
                                case 4: {
                                    await AnswerModel.showDataAnswer();
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
                                    await GoogleProfileModel.addDataGoogleProfile();
                                    break;
                                }
                                case 2: {
                                    await GoogleProfileModel.editDataGoogleProfile();
                                    break;
                                }
                                case 3: {
                                    await GoogleProfileModel.deleteDataGoogleProfile();
                                    break;
                                }
                                case 4: {
                                    await GoogleProfileModel.showDataGoogleProfile();
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
                                    await QuestionTagBindingModel.addDataQTB();
                                    break;
                                }
                                case 2: {
                                    await QuestionTagBindingModel.editDataQTB();
                                    break;
                                }
                                case 3: {
                                    await QuestionTagBindingModel.deleteDataQTB();
                                    break;
                                }
                                case 4: {
                                    await QuestionTagBindingModel.showDataQTB();
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
                                    await QuestionModel.addDataQuestion();
                                    break;
                                }
                                case 2: {
                                    await QuestionModel.editDataQuestion();
                                    break;
                                }
                                case 3: {
                                    await QuestionModel.deleteDataQuestion();
                                    break;
                                }
                                case 4: {
                                    await QuestionModel.showDataQuestion();
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
                                    await TagModel.addDataTag();
                                    break;
                                }
                                case 2: {
                                    await TagModel.editDataTag();
                                    break;
                                }
                                case 3: {
                                    await TagModel.deleteDataTag();
                                    break;
                                }
                                case 4: {
                                    await TagModel.showDataTag();
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
                                    await UserModel.addDataUser();
                                    break;
                                }
                                case 2: {
                                    await UserModel.editDataUser();
                                    break;
                                }
                                case 3: {
                                    await UserModel.deleteDataUser();
                                    break;
                                }
                                case 4: {
                                    await UserModel.showDataUser();
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
                            await Generate.generateUsers();
                            break;
                        }
                        case 8: {
                            View.dynamicSearchMenu();

                            let type: number = +question('input: ');

                            switch (type) {
                                case 1: {
                                    await DynamicQueries.specDate();
                                    break;
                                }
                                case 2: {
                                    await DynamicQueries.specTag();
                                    break;
                                }
                                case 3: {
                                    await DynamicQueries.specQDate();
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

