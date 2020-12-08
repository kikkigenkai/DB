export class FormatData {
    static toDate(date: Date): string {
        let dd: string = date.getDate().toString();
        let mm: string = (date.getMonth() + 1).toString();
        let yy: string = (date.getFullYear() % 100).toString();

        if (+dd < 10) {
            dd = '0' + dd;
        }
      
        if (+mm < 10) {
            mm = '0' + mm; 
        } 
      
        if (+yy < 10) {
           yy = '0' + yy; 
        } 
      
        return dd + '.' + mm + '.' + yy;
    }

    static toField(len: number, str: string): string {
        let newStr: string = str;

        while (newStr.length < len) {
            newStr += ' ';
        }

        return newStr;
    }
}