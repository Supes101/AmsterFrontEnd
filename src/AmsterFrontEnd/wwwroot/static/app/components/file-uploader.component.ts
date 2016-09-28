import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';


import { LogFileService }   from '../services/log-file.service';
import { LogFile }   from '../data/log-file.data';
import { LogProgress }   from '../data/log-progress.data';

declare var $: any;

@Component({
    selector: 'uploader',
    templateUrl: './app/components/file-uploader.component.html',
    providers: [LogFileService]
})

export class FileUploaderComponent implements OnInit {

    fileName = "";
    file: File;
    short_name = "";
    description = "";
    remStackTrace = false;
    stackTrace = "";
    timerID = 0;


    logProg: LogProgress = new LogProgress();;

    constructor(private logFileService: LogFileService, private router: Router) { }

    ngOnInit(): void {

        $("#hamster-done").hide();
        $("#hamster-error").hide();
        $("#frmClearBtn").hide();
        $("#frmUploadBtn").hide();
        $("#load-progress").hide();

        this.logFileService.checkUpload().subscribe(res => {
            this.logProg = res
            console.log(this.logProg);
            $("#frmUploadBtn").show();
        });

       // setInterval(this.checkProgress.bind(this), 1000);

    }

    handleFileSelect(evt) {
      
        // Read in the image file as a binary string.
        this.fileName = evt.target.files[0].name;
        this.file = evt.target.files[0];

       // this.logFileService.makeFileRequest(this.short_name, this.description,this.file).subscribe(message=>console.log(message));

    }

    viewLogFiles() {
        this.router.navigateByUrl('/logfiles');
    }

    startUpload() {

        if (typeof (this.file) == 'undefined' && this.file == null) {
            return;
        }

        if (typeof (this.fileName) == '' ) {
            return;
        }

        this.timerID=setInterval(this.checkProgress.bind(this), 1000);
        $("#load-progress").show();
        $("#frmUploadBtn").hide();
    }

    clear() {

        this.fileName = "";
        this.file = null;
        this.short_name = "";
        this.description = "";

        $("#hamster-done").hide();
        $("#hamster-error").hide();
        $("#hamster-chew").show();
        $("#frmClearBtn").hide();
        $("#frmUploadBtn").show();
        $("#load-progress").hide();

    }


    checkProgress() {
        this.logFileService.checkUpload().subscribe(res => {
            this.logProg = res
            $('#progress-bar').css('width', this.logProg.upload_percent + '%').attr('aria-valuenow', this.logProg.upload_percent);
            $('#progress-bar-parse').css('width', this.logProg.parse_percent + '%').attr('aria-valuenow', this.logProg.parse_percent);
            if (this.logProg.parse_percent === "100") {
                window.clearInterval(this.timerID);
            }
        });
    }

}