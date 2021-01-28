export class View {
    static mainMenu(): void {
        console.log('_____________________________________________________________');
        console.log('Database controller program\n');
        console.log('1. Table Answer');
        console.log('2. Table Google_Profile');
        console.log('3. Table QuestionTagsBinding');
        console.log('4. Table Questions');
        console.log('5. Table Tags');
        console.log('6. Table Users');
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
        console.log('1. Select confirmed users, who have registered in specific date interval and show their emails');
        console.log('2. Select questions with specific tag');
        console.log('3. Select and count questions after specific creation date');
        console.log('_____________________________________________________________');
    }
}
