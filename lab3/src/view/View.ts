export class View {
    static mainMenu(): void {
        console.log('_____________________________________________________________');
        console.log('Database controller program\n');
        console.log('1 Table Genre');
        console.log('2 Table Anime');
        console.log('3 Table User');
        console.log('4 Table Passport');
        console.log('5 Table Review');
        console.log('6 Table User_Passport');
        console.log('7 Table Watched');
        console.log('\n8 to exit\n');
        console.log('_____________________________________________________________');
    }

    static actionWithTable(tableName: string): void {
        console.log('_____________________________________________________________');
        console.log(`Table ${tableName}:\n`);
        console.log('1 add data');
        console.log('2 edit data');
        console.log('3 remove data');
        console.log('4 show data');
       console.log('_____________________________________________________________');
    }
}