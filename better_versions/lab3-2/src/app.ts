import "reflect-metadata";
import { createConnection } from "typeorm";

import { Creator } from './entity/Creator.js';
import { Game } from './entity/Game.js';
import { Publisher } from "./entity/Publisher.js";
import { Rate } from "./entity/Rate.js";
import { Hire } from "./entity/Hire.js";
import { Critique } from "./entity/Critique.js";

import { Controller } from "./controller/Controller.js";

createConnection({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "postgres",
    password: "qwerty",
    database: "games",
    entities: [ Creator, Game, Publisher, Rate, Hire, Critique ],
    synchronize: false,
    logging: false
}).then(async connection => {
    Controller.start(connection);
}).catch(error => console.log(error));

