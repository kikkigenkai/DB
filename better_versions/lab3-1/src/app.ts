import "reflect-metadata";
import { createConnection } from "typeorm";

import { Answer } from "./entity/Answer.js";
import { GoogleProfile } from "./entity/GoogleProfile.js";
import { QTB } from "./entity/QTB.js";
import { Questions } from "./entity/Questions.js";
import { Tags } from "./entity/Tags.js";
import { Users } from "./entity/Users.js";

import { Controller } from "./controller/Controller.js";

createConnection({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "postgres",
    password: "qwerty",
    database: "questions",
    entities: [ Answer, GoogleProfile, QTB, Questions, Tags, Users ],
    synchronize: false,
    logging: false
}).then(async connection => {
    Controller.start(connection);
}).catch(error => console.log(error));

