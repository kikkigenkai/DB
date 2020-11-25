import "reflect-metadata";
import {createConnection} from "typeorm";
import { Anime } from "./entity/Anime.js";
import { Genre } from "./entity/Genre.js";
import { Passport } from "./entity/Passport.js";
import { User } from "./entity/User.js";
import { Review } from "./entity/Review.js";
import { Watched } from "./entity/Watched.js";
import { UserPassport } from "./entity/UserPassport.js";

createConnection({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "postgres",
    password: "qwerty",
    database: "anime",
    entities: [ User, Anime, Genre, Passport, Review, Watched, UserPassport ],
    synchronize: false,
    logging: false
}).then(async connection => {

    //console.log("Inserting a new user into the database...");
    // const user = new User();

    // user.username = 'babel';
    // user.registry_date = '12.12.12';
    // user.confirmed = false;

    //const kek = await connection.manager.find(User);
    //console.log(kek);
    const monogat = new Review();

    monogat.r_text = 'kekekekekekek';
    monogat.rev_anime_id = 55;
    monogat.rev_user_id = 5;

    await connection.manager.save(monogat);
}).catch(error => console.log(error));
