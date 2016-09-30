"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var log_file_service_1 = require('../services/log-file.service');
var log_progress_data_1 = require('../data/log-progress.data');
var FileUploaderComponent = (function () {
    function FileUploaderComponent(logFileService, router) {
        this.logFileService = logFileService;
        this.router = router;
        this.fileName = "";
        this.short_name = "";
        this.description = "";
        this.remStackTrace = false;
        this.stackTrace = "";
        this.timerID = 0;
        this.writingInfo = false;
        this.logProg = new log_progress_data_1.LogProgress();
    }
    ;
    FileUploaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        $("#hamster-done").hide();
        $("#hamster-error").hide();
        $("#frmClearBtn").hide();
        $("#frmUploadBtn").hide();
        $("#load-progress").hide();
        this.logFileService.checkUpload().subscribe(function (res) {
            _this.logProg = res;
            console.log(_this.logProg);
            $("#frmUploadBtn").show();
        });
        // setInterval(this.checkProgress.bind(this), 1000);
    };
    FileUploaderComponent.prototype.handleFileSelect = function (evt) {
        // Read in the image file as a binary string.
        this.fileName = evt.target.files[0].name;
        this.file = evt.target.files[0];
        // this.logFileService.makeFileRequest(this.short_name, this.description,this.file).subscribe(message=>console.log(message));
    };
    FileUploaderComponent.prototype.viewLogFiles = function () {
        this.router.navigateByUrl('/logfiles');
    };
    FileUploaderComponent.prototype.startUpload = function () {
        if (typeof (this.file) == 'undefined' && this.file == null) {
            return;
        }
        if (typeof (this.fileName) == '') {
            return;
        }
        this.timerID = setInterval(this.checkProgress.bind(this), 1000);
        $("#load-progress").show();
        $("#frmUploadBtn").hide();
    };
    FileUploaderComponent.prototype.clear = function () {
        this.fileName = "";
        this.file = null;
        this.short_name = "";
        this.description = "";
        this.writingInfo = false;
        $("#hamster-done").hide();
        $("#hamster-error").hide();
        $("#hamster-chew").show();
        $("#frmClearBtn").hide();
        $("#frmUploadBtn").show();
        $("#load-progress").hide();
    };
    FileUploaderComponent.prototype.checkProgress = function () {
        var _this = this;
        this.logFileService.checkUpload().subscribe(function (res) {
            _this.logProg = res;
            $('#progress-bar').css('width', _this.logProg.upload_percent + '%').attr('aria-valuenow', _this.logProg.upload_percent);
            $('#progress-bar-parse').css('width', _this.logProg.parse_percent + '%').attr('aria-valuenow', _this.logProg.parse_percent);
            console.log("UPLOAD PERCENT: " + _this.logProg.upload_percent + " PARSE PERCENT: " + _this.logProg.parse_percent);
            if (parseInt(_this.logProg.parse_percent) >= 98) {
                //  console.log(this.timerID);
                window.clearInterval(_this.timerID);
                _this.writingInfo = true;
            }
        });
    };
    FileUploaderComponent = __decorate([
        core_1.Component({
            selector: 'uploader',
            templateUrl: './app/components/file-uploader.component.html',
            providers: [log_file_service_1.LogFileService]
        }), 
        __metadata('design:paramtypes', [log_file_service_1.LogFileService, router_1.Router])
    ], FileUploaderComponent);
    return FileUploaderComponent;
}());
exports.FileUploaderComponent = FileUploaderComponent;
//# sourceMappingURL=file-uploader.component.js.map