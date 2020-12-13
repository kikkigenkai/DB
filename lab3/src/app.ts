import "reflect-metadata";
import { createConnection } from "typeorm";

import { Anime } from "./entity/Anime.js";
import { Genre } from "./entity/Genre.js";
import { Passport } from "./entity/Passport.js";
import { User } from "./entity/User.js";
import { Review } from "./entity/Review.js";
import { Watched } from "./entity/Watched.js";
import { UserPassport } from "./entity/UserPassport.js";

import { Controller } from "./controller/Controller.js";

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
    Controller.start(connection);
}).catch(error => console.log(error));

