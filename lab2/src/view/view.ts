class View {
    static mainMenu(): void {
        console.log('_____________________________________________________________');
        console.log('Database controller program\n');
        console.log('1. Table Genre');
        console.log('2. Table Anime');
        console.log('3. Table User');
        console.log('4. Table Passport');
        console.log('5. Table Review');
        console.log('6. Table User_Passport');
        console.log('7. Table Watched');
        console.log('8. Generate rows');
        console.log('9. Search static');
        console.log('10. Search dynamic');
        console.log('_____________________________________________________________');
    }

    static actionWithTable(tableName: string): void {
        console.log('_____________________________________________________________');
        console.log(`Table ${tableName}:\n`);
        console.log('1. add data');
        console.log('2. edit data');
        console.log('3. remove data');
        console.log('4. show data');
        console.log('_____________________________________________________________');
    }

    static staticSearchMenu(): void {
        console.log('_____________________________________________________________');
        console.log('1. Select users, that confirmed and made review to anime,\n  that they watched');
        console.log('2. Select users that are confirmed and born after 2000');
        console.log('3. Most popular anime(s) (by views)');
        console.log('_____________________________________________________________');
    }

    static dynamicSearchMenu(): void {
        console.log('_____________________________________________________________');
        console.log('1. Select confirmed users, who have registered in specific date interval');
        console.log('2. Select anime with specific genre');
        console.log('3. Select anime and with specefec count of series and show genre');
        console.log('_____________________________________________________________');
    }
}
