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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('../rxjs-operators');
var amster_properties_1 = require('../amster.properties');
var LogFileService = (function () {
    function LogFileService(http) {
        this.http = http;
        this.amster = new amster_properties_1.Amster();
        this.hostUrl = this.amster.server_location;
    }
    LogFileService.prototype.getLogFiles = function () {
        return this.http.get(this.hostUrl + '/rest/logfile')
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    LogFileService.prototype.getLogFile = function (id) {
        return this.http.get(this.hostUrl + '/rest/logfile?id=' + id)
            .map(function (res) { return res.json()[0]; })
            .catch(this.handleError);
    };
    LogFileService.prototype.getTimeLine = function (id) {
        return this.http.get(this.hostUrl + '/rest/timeline?id=' + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    LogFileService.prototype.getThreads = function (id) {
        return this.http.get(this.hostUrl + '/rest/threads?id=' + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    LogFileService.prototype.getQueries = function (id) {
        return this.http.get(this.hostUrl + '/rest/top-queries?id=' + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    LogFileService.prototype.getDiagnostics = function (id) {
        return this.http.get(this.hostUrl + '/rest/diagnostics?id=' + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    LogFileService.prototype.getExceptions = function (id) {
        return this.http.get(this.hostUrl + '/rest/exceptions?id=' + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    LogFileService.prototype.checkUpload = function () {
        return this.http.get(this.hostUrl + '/uploadlog')
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    LogFileService.prototype.handleError = function (error) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    LogFileService.prototype.makeFileRequest = function (short_name, description, file) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            formData.append("short_name", short_name);
            formData.append("description", description);
            formData.append("file", file, file.name);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.response);
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    }
                    else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = function (event) {
                console.log(event);
            };
            xhr.open('POST', _this.hostUrl + 'uploadlog', true);
            // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send(formData);
        });
    };
    LogFileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LogFileService);
    return LogFileService;
}());
exports.LogFileService = LogFileService;
//# sourceMappingURL=log-file.service.js.map