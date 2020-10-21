"use strict";
var TablesDB;
(function (TablesDB) {
    class View {
        static mainMenu() {
            console.log('_____________________________________________________________');
            console.log('Database controller program\n');
            console.log('Table Genre');
            console.log('Table Anime');
            console.log('Table User');
            console.log('Table Passport');
            console.log('Table Review');
            console.log('\nq to exit\n');
            console.log('   tips: *type table "table name" without quotes');
            console.log('           to pick any table from list.');
            console.log('         *Example: table Anime');
            console.log('         *table names are case sensitivity!');
            console.log('         *you can type command home or q anytime');
            console.log('           for example, type home to return to main menu.');
            console.log('_____________________________________________________________');
        }
        static actionWithTable(tableName) {
            console.log('_____________________________________________________________');
            console.log(`Table ${tableName}:\n`);
            console.log('Add data');
            console.log('Edit data');
            console.log('Remove data');
            console.log('tip: type command, for example, add');
            console.log('_____________________________________________________________');
        }
    }
    module.exports = View;
})(TablesDB || (TablesDB = {}));
