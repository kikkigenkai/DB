"use strict";
var PoolDB;
(function (PoolDB) {
    PoolDB.pool = new Pool({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'anime',
        password: 'qwerty',
        port: 5432,
    });
})(PoolDB || (PoolDB = {}));
