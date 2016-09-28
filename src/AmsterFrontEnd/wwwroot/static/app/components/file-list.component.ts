import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LogFileService }   from '../services/log-file.service';
import { LogFile }   from '../data/log-file.data';

@Component({
    selector: 'file-list',
    templateUrl: './app/components/file-list.component.html',
    providers: [LogFileService]
})
export class FileListComponent implements OnInit{

    fileCount = "0 files";
    fileString = " files";
    logFiles: LogFile[];
    errorMessage: String;

    constructor(private logFileService: LogFileService, private router: Router) { }

    getLogFiles() {
        this.logFileService.getLogFiles()
            .subscribe(
            data => {
                this.logFiles = data;
                if (this.logFiles.length == 1) {
                    this.fileString = " file"
                }
                this.fileCount = this.logFiles.length+this.fileString},
            error => this.errorMessage = <any>error);
    }

    ngOnInit(): void {
        this.getLogFiles();
    }

    onSelect(logF: LogFile) {
        console.log(logF);
        let link = ['/file-detail', logF.id];
        this.router.navigate(link);
    }

}