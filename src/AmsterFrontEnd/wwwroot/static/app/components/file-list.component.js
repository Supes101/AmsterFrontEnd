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
var FileListComponent = (function () {
    function FileListComponent(logFileService, router) {
        this.logFileService = logFileService;
        this.router = router;
        this.fileCount = "0 files";
        this.fileString = " files";
    }
    FileListComponent.prototype.getLogFiles = function () {
        var _this = this;
        this.logFileService.getLogFiles()
            .subscribe(function (data) {
            _this.logFiles = data;
            if (_this.logFiles.length == 1) {
                _this.fileString = " file";
            }
            _this.fileCount = _this.logFiles.length + _this.fileString;
        }, function (error) { return _this.errorMessage = error; });
    };
    FileListComponent.prototype.ngOnInit = function () {
        this.getLogFiles();
    };
    FileListComponent.prototype.onSelect = function (logF) {
        console.log(logF);
        var link = ['/file-detail', logF.id];
        this.router.navigate(link);
    };
    FileListComponent = __decorate([
        core_1.Component({
            selector: 'file-list',
            templateUrl: './app/components/file-list.component.html',
            providers: [log_file_service_1.LogFileService]
        }), 
        __metadata('design:paramtypes', [log_file_service_1.LogFileService, router_1.Router])
    ], FileListComponent);
    return FileListComponent;
}());
exports.FileListComponent = FileListComponent;
//# sourceMappingURL=file-list.component.js.map