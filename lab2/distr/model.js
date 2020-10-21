"use strict";
const { Pool, Client } = require('pg');
var TablesDB;
(function (TablesDB) {
    const readLineSync = require('readline-sync');
    const pool = new Pool({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'anime',
        password: 'qwerty',
        port: 5432,
    });
    class Model {
        static addDataAnime() {
            let animeRow = {
                length: 4,
                columns: {
                    a_name: '',
                    description: '',
                    series: 0,
                    genre: 0
                }
            };
            animeRow.columns.a_name = readLineSync.question('anime name: ');
            animeRow.columns.description = readLineSync.question('anime description: ');
            animeRow.columns.series = readLineSync.question('anime series: ');
            animeRow.columns.genre = readLineSync.question('anime genre id: ');
            return animeRow;
        }
        static addDataGenre() {
            let genreRow = {
                length: 1,
                columns: {
                    g_name: ''
                }
            };
            genreRow.columns.g_name = readLineSync.question('genre name: ');
            return genreRow;
        }
        static addDataPassport() {
            let passportRow = {
                length: 3,
                columns: {
                    name: '',
                    surname: '',
                    birth_date: ''
                }
            };
            passportRow.columns.name = readLineSync.question('passport name: ');
            passportRow.columns.surname = readLineSync.question('passport surnamename: ');
            passportRow.columns.birth_date = readLineSync.question('passport birth date: ');
            return passportRow;
        }
        static addDataReview() {
            let reviewRow = {
                length: 3,
                columns: {
                    r_text: '',
                    user_id: 0,
                    anime_id: 0
                }
            };
            reviewRow.columns.r_text = readLineSync.question('review text: ');
            reviewRow.columns.user_id = readLineSync.question('review author id: ');
            reviewRow.columns.anime_id = readLineSync.question('review anime id: ');
            return reviewRow;
        }
        static addDataUser() {
            let userRow = {
                length: 2,
                columns: {
                    username: '',
                    registry_date: ''
                }
            };
            userRow.columns.username = readLineSync.question('user nickname: ');
            userRow.columns.registry_date = this.formatDate(new Date(Date.now()));
            return userRow;
        }
        static addDataUserPassport() {
            let userPassportRow = {
                length: 2,
                columns: {
                    passport_id: 0,
                    user_id: 0
                }
            };
            userPassportRow.columns.passport_id = readLineSync.question('user passport id: ');
            userPassportRow.columns.user_id = readLineSync.question('user id: ');
            return userPassportRow;
        }
        static addDataWatched() {
            let watchRow = {
                length: 2,
                columns: {
                    watch_anime_id: 0,
                    watch_user_id: 0
                }
            };
            watchRow.columns.watch_anime_id = readLineSync.question('anime id: ');
            watchRow.columns.watch_user_id = readLineSync.question('user id: ');
            return watchRow;
        }
        static formatDate(date) {
            let dd = date.getDate().toString();
            let mm = (date.getMonth() + 1).toString();
            let yy = (date.getFullYear() % 100).toString();
            if (+dd < 10) {
                dd = '0' + dd;
            }
            if (+mm < 10) {
                mm = '0' + mm;
            }
            if (+yy < 10) {
                yy = '0' + yy;
            }
            return dd + '.' + mm + '.' + yy;
        }
    }
    module.exports = Model;
})(TablesDB || (TablesDB = {}));
