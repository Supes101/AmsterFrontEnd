export class LogFile {
    id: string;
    shortName: string;
    realFileName: string;
    outputFileName: string;
    description: string;
    createDate: Date;

    LogFile() {
        this.id = "";
        this.shortName = "";
        this.realFileName = "";
        this.outputFileName = "";
        this.description = "New";
        this.createDate = new Date();
    }
}
