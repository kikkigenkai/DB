import { question } from 'readline-sync';

import { Format } from './format.js';
import { 
    Tags, 
    Users, 
    GoogleProfile, 
    QuestionTagsBinding, 
    Question, 
    Answer 
} from '../types';


export class Reader {
    static prepareDataTag(): Tags {
        const tag: Tags = {};

        tag.tName = question('tName: ');
        tag.description = question('description: ');

        return tag;
    }

    static prepareDataUser(): Users {
        const user: Users = {};

        user.username = question('username: ');
        user.reg_date = Format.formatDate(new Date(Date.now()));
        user.rating = +question('rating: ');

        return user;
    }

    static prepareDataGoogleProfile(): GoogleProfile {
        const googleProfile: GoogleProfile = {};

        googleProfile.email = question('email: ');
        googleProfile.nickname = question('nickname: ');
        googleProfile.adIdentifier = +question('ad id: ');
        googleProfile.questionUser = +question('user id: ');

        return googleProfile;
    }

    static prepareDataQuestion(): Question {
        const quest: Question = {};

        quest.qHeader = question('question header: ');
        quest.qText = question('question text: ');
        quest.creationDate = Format.formatDate(new Date(Date.now()));
        quest.authorId = +question('author id: ');

        return quest;
    }

    static prepareDataQuestionTagsBinding(): QuestionTagsBinding {
        const qtb: QuestionTagsBinding = {};

        qtb.qt_question_id = +question('question id: ');
        qtb.qt_tag_id = +question('tag id: ');

        return qtb;
    } 

    static prepareDataAnswer(): Answer {
        const answer: Answer = {};

        answer.aHeader = question('answer header: ');
        answer.aText = question('answer text: ');
        answer.aCreationDate = Format.formatDate(new Date(Date.now()));
        answer.a_author_id = +question('author id: ');
        answer.a_question_id = +question('question id: ');

        return answer;
    }
}