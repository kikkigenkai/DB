const pool = require('../db.js');
import { question } from 'readline-sync';

import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';
import { GoogleProfile } from '../types.js';

export class GoogleProfileModel {
    static async addDataGoogleProfile() {
        try {
            const newProfile: GoogleProfile = Reader.prepareDataGoogleProfile();
            const text: string = 'INSERT INTO "Google_Profile" ("email", "nickname", "adIdentifier", "questionUser") VALUES($1, $2, $3, $4)';

            await pool.query(text, [newProfile.email, newProfile.nickname, newProfile.adIdentifier, newProfile.questionUser]);

            console.log('Added 1 row to table Google_Profile');
        } catch (err) {
            console.log(err);
        }
    }

    static async editDataGoogleProfile() {
        try {
            const id: number = +question('profile id: ');
            const updateProfile: GoogleProfile = Reader.prepareDataGoogleProfile();
            const text: string = 'UPDATE "Google_Profile" SET "email" = $1, "nickname" = $2, "adIdentifier" = $3, "questionUser" = $4 WHERE "gpId" = $5';
            const check = await pool.query('SELECT * FROM "Google_Profile" WHERE "gpId" = $1', [id]);
            
            if (!check.rows.length) {
                console.log(`There is no profile with id ${id} in database`);
            } else {
                const userCheck = await pool.query('SELECT * FROM "Users" WHERE "userId" = $1', [updateProfile.questionUser]);

                if (!userCheck.rows.length) {
                    console.log(`There is no user with id ${updateProfile.questionUser} in database`);
                } else {
                    await pool.query(text, [updateProfile.email, updateProfile.nickname, updateProfile.adIdentifier, updateProfile.questionUser, id]);

                    console.log(`Row with id ${id} has been updated`);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteDataGoogleProfile() {
        try {
            const id: number = +question('profile id: ');
            const text: string = 'DELETE FROM "Google_Profile" WHERE "gpId" = $1';
            const check = await pool.query('SELECT * FROM "Google_Profile" WHERE "gpId" = $1', [id]);
            
            if (!check.rows.length) {
                console.log(`There is no profile with id ${id} in database`);
            } else {
                await pool.query(text, [id]);

                console.log(`Row with ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async showDataGoogleProfile() {
        try {
            const profiles = await pool.query('SELECT * FROM "Google_Profile"');

            Printer.printGoogleProfiles(profiles.rows);
        } catch (err) {
            console.log(err);
        }
    }
}