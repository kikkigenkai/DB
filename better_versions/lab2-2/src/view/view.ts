export class View {
    static mainMenu(): void {
        console.log('_____________________________________________________________');
        console.log('Database controller program\n');
        console.log('1. Table Creator');
        console.log('2. Table Critique');
        console.log('3. Table Game');
        console.log('4. Table Hire');
        console.log('5. Table Publisher');
        console.log('6. Table Rate');
        console.log('7. Generate rows');
        console.log('8. Search dynamic');
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

    static dynamicSearchMenu(): void {
        console.log('_____________________________________________________________');
        console.log('1. Select creators by publisher name');
        console.log('2. Select games by creator name');
        console.log('3. Show top critiques by rate count');
        console.log('_____________________________________________________________');
    }
}
