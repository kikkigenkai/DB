import { question } from 'readline-sync';

import { Format } from './format.js';
import { Tags } from '../entity/Tags.js';
import { Answer } from '../entity/Answer.js';
import { QTB } from '../entity/QTB.js';
import { Questions } from '../entity/Questions.js';
import { Users } from '../entity/Users.js';
import { GoogleProfile } from '../entity/GoogleProfile.js';


export class Reader {
    static prepareDataTag(): Tags {
        const tag: Tags = new Tags();

        tag.tName = question('tName: ');
        tag.description = question('description: ');

        return tag;
    }

    static prepareDataUser(): Users {
        const user: Users = new Users();

        user.username = question('username: ');
        user.reg_date = Format.toDate(new Date(Date.now()));
        user.rating = +question('rating: ');

        return user;
    }

    static prepareDataGoogleProfile(): GoogleProfile {
        const googleProfile: GoogleProfile = new GoogleProfile();

        googleProfile.email = question('email: ');
        googleProfile.nickname = question('nickname: ');
        googleProfile.adIdentifier = +question('ad id: ');
        googleProfile.questionUser = +question('user id: ');

        return googleProfile;
    }

    static prepareDataQuestion(): Questions {
        const quest: Questions = new Questions();

        quest.qHeader = question('question header: ');
        quest.qText = question('question text: ');
        quest.creationDate = Format.toDate(new Date(Date.now()));
        quest.authorId = +question('author id: ');

        return quest;
    }

    static prepareDataQuestionTagsBinding(): QTB {
        const qtb: QTB = new QTB();

        qtb.qt_question_id = +question('question id: ');
        qtb.qt_tag_id = +question('tag id: ');

        return qtb;
    } 

    static prepareDataAnswer(): Answer {
        const answer: Answer = new Answer();

        answer.aHeader = question('answer header: ');
        answer.aText = question('answer text: ');
        answer.aCreationDate = Format.toDate(new Date(Date.now()));
        answer.a_author_id = +question('author id: ');
        answer.a_question_id = +question('question id: ');

        return answer;
    }
}