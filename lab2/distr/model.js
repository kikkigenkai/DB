"use strict";
var TablesDB;
(function (TablesDB) {
    const { Pool, Client } = require('pg');
    const readLineSync = require('readline-sync');
    const client = new Client({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'anime',
        password: 'qwerty',
        port: 5432,
    });
    client.connect();
    class Model {
        static prepareDataAnime() {
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
        static addDataAnime(animeRow) {
            const text = 'INSERT INTO anime (a_name, description, series, genre) VALUES ($1, $2, $3, $4)';
            const values = [animeRow.columns.a_name, animeRow.columns.description, animeRow.columns.series, animeRow.columns.genre];
            client.query('SELECT genre_id FROM genre where genre_id = $1', animeRow.columns.genre, async (err, res) => {
                if (res.rows.length === 0) {
                    console.log(`There is no genre_id = ${animeRow.columns.genre} in database`);
                    await client.end();
                }
                else {
                    client.query(text, values, async (err, res) => {
                        if (err) {
                            console.log(err.stack);
                        }
                        else {
                            console.log('Added 1 element to table anime');
                            await client.end();
                        }
                    });
                }
            });
        }
        static async editDataAnime() {
            const aName = readLineSync.question('name of anime for editing: ');
            const checkText = 'SELECT a_name FROM anime where a_name = $1';
            const text = 'UPDATE anime SET a_name = $1, description = $2, series = $3, genre = $4 WHERE a_name = $5';
            try {
                const check = await client.query(checkText, [aName]);
                if (check.rows.length === 0) {
                    console.log(`There is no ${aName} anime in table anime`);
                    await client.end();
                }
                else {
                    const newRow = this.prepareDataAnime();
                    const values = [
                        newRow.columns.a_name,
                        newRow.columns.description,
                        newRow.columns.series,
                        newRow.columns.genre,
                        aName
                    ];
                    client.query(text, values)
                        .then((res) => {
                        console.log(`Row with a_name = ${aName} has been updated`);
                        client.end();
                    })
                        .catch((err) => {
                        console.log(err.detail);
                        client.end();
                    });
                }
            }
            catch (err) {
                console.log(err.detail);
                client.end();
            }
        }
        static prepareDataGenre() {
            let genreRow = {
                length: 1,
                columns: {
                    g_name: ''
                }
            };
            genreRow.columns.g_name = readLineSync.question('genre name: ');
            return genreRow;
        }
        static addDataGenre(genreRow) {
            const text = 'INSERT INTO genre (g_name) VALUES ($1)';
            const values = [genreRow.columns.g_name];
            client.query(text, values, async (err, res) => {
                if (err) {
                    console.log(err.stack);
                }
                else {
                    console.log('Added 1 element to table genre');
                    await client.end();
                }
            });
        }
        static async editDataGenre() {
            const gName = readLineSync.question('name of genre for editing: ');
            const checkText = 'SELECT g_name FROM genre where g_name = $1';
            const text = 'UPDATE genre SET g_name = $1 WHERE g_name = $2';
            try {
                const check = await client.query(checkText, [gName]);
                if (check.rows.length === 0) {
                    console.log(`There is no ${gName} genre in table genre`);
                    client.end();
                }
                else {
                    const newRow = this.prepareDataGenre();
                    const values = [
                        newRow.columns.g_name,
                        gName
                    ];
                    client.query(text, values)
                        .then((res) => {
                        console.log(`Row with g_name = ${gName} has been updated`);
                        client.end();
                    })
                        .catch((err) => {
                        console.log(err.detail);
                        client.end();
                    });
                }
            }
            catch (err) {
                console.log(err.detail);
                client.end();
            }
        }
        static prepareDataPassport() {
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
        static addDataPassport(passportRow) {
            const text = 'INSERT INTO passport (name, surname, birth_date) VALUES ($1, $2, $3)';
            const values = [passportRow.columns.name, passportRow.columns.surname, passportRow.columns.birth_date];
            client.query(text, values, async (err, res) => {
                if (err) {
                    console.log(err.stack);
                }
                else {
                    console.log('Added 1 element to table passport');
                    await client.end();
                }
            });
        }
        static async editDataPassport() {
            const pID = readLineSync.question('ID of passport for editing: ');
            const checkText = 'SELECT passport_id FROM passport where passport_id = $1';
            const text = 'UPDATE passport SET name = $1, surname = $2, birth_date = $3 WHERE passport_id = $4';
            try {
                const check = await client.query(checkText, [pID]);
                if (check.rows.length === 0) {
                    console.log(`There is no row with passport_id = ${pID} in table passport`);
                    client.end();
                }
                else {
                    const newRow = this.prepareDataPassport();
                    const values = [
                        newRow.columns.name,
                        newRow.columns.surname,
                        newRow.columns.birth_date,
                        pID
                    ];
                    client.query(text, values)
                        .then((res) => {
                        console.log(`Row with passport_id = ${pID} has been updated`);
                        client.end();
                    })
                        .catch((err) => {
                        console.log('Wrong values');
                        client.end();
                    });
                }
            }
            catch (err) {
                console.log(err.detail);
            }
        }
        static prepareDataReview() {
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
        static addDataReview(reviewRow) {
            const text = 'INSERT INTO review (r_text, user_id, anime_id) VALUES ($1, $2, $3)';
            const values = [reviewRow.columns.r_text, reviewRow.columns.user_id, reviewRow.columns.anime_id];
            const checkQuerry = 'SELECT uu.user_id, aa.anime_id FROM "user" AS uu JOIN anime AS aa ON uu.user_id = $1 AND aa.anime_id = $2';
            const checkValues = [reviewRow.columns.user_id, reviewRow.columns.anime_id];
            client.query(checkQuerry, checkValues, async (err, res) => {
                if (res.rows.length === 0) {
                    console.log(`There is no user_id = ${reviewRow.columns.user_id} or anime_id = ${reviewRow.columns.anime_id} in database`);
                    await client.end();
                }
                else {
                    client.query(text, values, async (err, res) => {
                        if (err) {
                            console.log(err.stack);
                        }
                        else {
                            console.log('Added 1 element to table review');
                            await client.end();
                        }
                    });
                }
            });
        }
        static async editDataReview() {
            const rID = readLineSync.question('ID of review for editing: ');
            const checkText = 'SELECT review_id FROM review where review_id = $1';
            const text = 'UPDATE review SET r_text = $1, user_id = $2, anime_id = $3 WHERE review_id = $4';
            try {
                const check = await client.query(checkText, [rID]);
                if (check.rows.length === 0) {
                    console.log(`There is no ${rID} review_id in table review`);
                    client.end();
                }
                else {
                    const newRow = this.prepareDataReview();
                    const values = [
                        newRow.columns.r_text,
                        newRow.columns.user_id,
                        newRow.columns.anime_id,
                        rID
                    ];
                    client.query(text, values)
                        .then((res) => {
                        console.log(`Row with review_id = ${rID} has been updated`);
                        client.end();
                    })
                        .catch((err) => {
                        console.log(err.detail);
                        client.end();
                    });
                }
            }
            catch (err) {
                console.log(err.detail);
            }
        }
        static prepareDataUser() {
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
        static addDataUser(userRow) {
            const text = 'INSERT INTO "user" (username, registry_date) VALUES ($1, $2)';
            const values = [userRow.columns.username, userRow.columns.registry_date];
            client.query(text, values, async (err, res) => {
                if (err) {
                    console.log(err.stack);
                }
                else {
                    console.log('Added 1 element to table user');
                    await client.end();
                }
            });
        }
        static async editDataUser() {
            const uID = readLineSync.question('ID of user for editing: ');
            const checkText = 'SELECT user_id FROM "user" where user_id = $1';
            const text = 'UPDATE "user" SET username = $1, registry_date = $2 WHERE user_id = $3';
            try {
                const check = await client.query(checkText, [uID]);
                if (check.rows.length === 0) {
                    console.log(`There is no record with user_id = ${uID} in table user`);
                    client.end();
                }
                else {
                    const newRow = this.prepareDataUser();
                    const values = [
                        newRow.columns.username,
                        newRow.columns.registry_date,
                        uID
                    ];
                    client.query(text, values)
                        .then((res) => {
                        console.log(`Row with user_id = ${uID} has been updated`);
                        client.end();
                    })
                        .catch((err) => {
                        console.log('Something went wrong');
                        client.end();
                    });
                }
            }
            catch (err) {
                console.log('Something went wrong');
                client.end();
            }
        }
        static prepareDataUserPassport() {
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
        static addDataUserPassport(usPasRow) {
            const text = 'INSERT INTO user_passport (user_id, passport_id) VALUES ($1, $2)';
            const values = [usPasRow.columns.user_id, usPasRow.columns.passport_id];
            const checkQuerry = 'SELECT uu.user_id, pp.passport_id FROM "user" AS uu JOIN passport AS pp ON uu.user_id = $1 AND pp.passport_id = $2';
            const checkValues = [usPasRow.columns.user_id, usPasRow.columns.passport_id];
            const uniqueCheck = 'SELECT user_id, passport_id FROM user_passport AS up WHERE up.user_id = $1 AND up.passport_id = $2;';
            client.query(uniqueCheck, checkValues, async (err, res) => {
                if (res.rows.length !== 0) {
                    console.log(`Row with user_id = ${usPasRow.columns.user_id} and passport_id = ${usPasRow.columns.passport_id} already exists in table user_passport`);
                    await client.end();
                }
                else {
                    client.query(checkQuerry, checkValues, async (err, res) => {
                        if (res.rows.length === 0) {
                            console.log(`There is no user_id = ${usPasRow.columns.user_id} or passport_id = ${usPasRow.columns.passport_id} in database`);
                            await client.end();
                        }
                        else {
                            client.query(text, values, async (err, res) => {
                                if (err) {
                                    console.log(err.stack);
                                }
                                else {
                                    console.log('Added 1 element to table user_passport');
                                    await client.end();
                                }
                            });
                        }
                    });
                }
            });
        }
        static async editDataUserPassport() {
            const upID = readLineSync.question('ID of user_passport record for editing: ');
            const checkText = 'SELECT user_passport_id FROM user_passport where user_passport_id = $1';
            const text = 'UPDATE user_passport SET user_id = $1, passport_id = $2 WHERE user_passport_id = $3';
            try {
                const check = await client.query(checkText, [upID]);
                if (check.rows.length === 0) {
                    console.log(`There is no record with user_passport_id = ${upID} in table user_passport`);
                    client.end();
                }
                else {
                    const newRow = this.prepareDataUserPassport();
                    const values = [
                        newRow.columns.user_id,
                        newRow.columns.passport_id,
                        upID
                    ];
                    client.query(text, values)
                        .then((res) => {
                        console.log(`Row with user_passport_id = ${upID} has been updated`);
                        client.end();
                    })
                        .catch((err) => {
                        console.log(err.detail);
                        client.end();
                    });
                }
            }
            catch (err) {
                console.log('Something went wrong');
                client.end();
            }
        }
        static prepareDataWatched() {
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
        static addDataWatched(watchRow) {
            const text = 'INSERT INTO watched (watch_anime_id, watch_user_id) VALUES ($1, $2)';
            const values = [watchRow.columns.watch_anime_id, watchRow.columns.watch_user_id];
            const checkQuerry = 'SELECT uu.user_id, aa.anime_id FROM "user" AS uu JOIN anime AS aa ON aa.anime_id = $1 AND uu.user_id = $2';
            const uniqueCheck = 'SELECT watch_user_id, watch_anime_id FROM watched AS up WHERE up.watch_anime_id = $1 AND up.watch_user_id = $2;';
            client.query(checkQuerry, values, async (err, res) => {
                if (res.rows.length === 0) {
                    console.log(`There is no user_id = ${watchRow.columns.watch_user_id} or anime_id = ${watchRow.columns.watch_anime_id} in database`);
                    await client.end();
                }
                else {
                    client.query(uniqueCheck, values, async (err, res) => {
                        if (res.rows.length) {
                            console.log(`Row with user_id = ${watchRow.columns.watch_user_id} and anime_id = ${watchRow.columns.watch_anime_id} already exists in table watched`);
                            await client.end();
                        }
                        else {
                            client.query(text, values, async (err, res) => {
                                if (err) {
                                    console.log(err.stack);
                                }
                                else {
                                    console.log('Added 1 element to table watched');
                                    await client.end();
                                }
                            });
                        }
                    });
                }
            });
        }
        static async editDataWatched() {
            const wID = readLineSync.question('ID of watching for editing: ');
            const checkText = 'SELECT a_watched_id FROM watched where a_watched_id = $1';
            const text = 'UPDATE watched SET watch_anime_id = $1, watch_user_id = $2 WHERE a_watched_id = $3';
            try {
                const check = await client.query(checkText, [wID]);
                if (check.rows.length === 0) {
                    console.log(`There is no watch with a_watched_id = ${wID} in table watched`);
                    client.end();
                }
                else {
                    const newRow = this.prepareDataWatched();
                    const values = [
                        newRow.columns.watch_anime_id,
                        newRow.columns.watch_user_id,
                        wID
                    ];
                    client.query(text, values)
                        .then((res) => {
                        console.log(`Row with a_watched_id = ${wID} has been updated`);
                        client.end();
                    })
                        .catch((err) => {
                        console.log(err.detail);
                        client.end();
                    });
                }
            }
            catch (err) {
                console.log('Something went wrong');
                client.end();
            }
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
    module.exports = { Model, client };
})(TablesDB || (TablesDB = {}));
