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
            console.log('Table User_Passport');
            console.log('Table Watched');
            console.log('Generate rows');
            console.log('Search static');
            console.log('Search dynamic');
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
            console.log('add data');
            console.log('edit data');
            console.log('remove data');
            console.log('show data');
            console.log('tip: type command, for example, add');
            console.log('_____________________________________________________________');
        }
        static staticSearchMenu() {
            console.log('_____________________________________________________________');
            console.log('1 Select users, that confirmed and made review to anime,\n  that they watched');
            console.log('2 Select users that are confirmed and born after 2000');
            console.log('3 Most popular anime(s) (by views)');
            console.log('_____________________________________________________________');
        }
        static dynamicSearchMenu() {
            console.log('_____________________________________________________________');
            console.log('1 Select confirmed users, who have registered in specific date interval');
            console.log('2 Select anime with specific genre');
            console.log('3 Select anime and with specefec count of series and show genre');
            console.log('_____________________________________________________________');
        }
    }
    module.exports = View;
})(TablesDB || (TablesDB = {}));
