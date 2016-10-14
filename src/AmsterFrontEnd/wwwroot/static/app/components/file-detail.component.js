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
var amster_properties_1 = require('../amster.properties');
var FileDetailComponent = (function () {
    function FileDetailComponent(logFileService, route) {
        this.logFileService = logFileService;
        this.route = route;
        this.errorMessage = "";
        this.amster = new amster_properties_1.Amster();
        this.timeLineClass = "timeline-item";
        this.arrowClass = "arrow";
        this.charts = ['terques-chart', 'purple-chart', 'green-chart', 'red-chart', 'yellow-chart', 'blue-chart'];
        this.chartPos = 0;
        this.doneSon = false;
        this.diagLoad = false;
    }
    FileDetailComponent.prototype.ngAfterViewChecked = function () {
        /* need _canScrollDown because it triggers even if you enter text in the textarea */
        if (!this.diagnostics) {
            return;
        }
        if (this.doneSon == true) {
            return;
        }
        this.doneSon = true;
        for (var x = 0; x < this.diagnostics.length; x++) {
            $("#graphy" + this.diagnostics[x].id).sparkline(this.diagnostics[x].graph, {
                type: 'line',
                width: '95%',
                fillColor: '',
                lineColor: '#ffffff',
                height: '150px',
                lineWidth: '1px',
                spotColor: '#ffffff',
                spotRadius: '2'
            });
        }
    };
    FileDetailComponent.prototype.ngOnChanges = function (changes) {
        console.log('here');
    };
    FileDetailComponent.prototype.getChartStyle = function () {
        this.chartPos++;
        if (this.chartPos > 5) {
            this.chartPos = 0;
        }
        return this.charts[this.chartPos];
    };
    FileDetailComponent.prototype.moreClick = function (e) {
        e.showDesc = true;
    };
    FileDetailComponent.prototype.lessClick = function (e) {
        e.showDesc = false;
    };
    FileDetailComponent.prototype.getOutputFile = function (fileName) {
        return this.amster.log_location + fileName;
    };
    FileDetailComponent.prototype.getTheFirstBit = function (s) {
        if (s.length < 80) {
            return s;
        }
        else {
            return s.substring(0, 79) + "...";
        }
    };
    FileDetailComponent.prototype.getTimeLineClass = function () {
        if (this.timeLineClass === "timeline-item") {
            this.timeLineClass = "timeline-item alt";
        }
        else {
            this.timeLineClass = "timeline-item";
        }
        return this.timeLineClass;
    };
    ;
    FileDetailComponent.prototype.getTimeLine = function (id) {
        var _this = this;
        this.logFileService.getTimeLine(id)
            .subscribe(function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i].timeLineClass = _this.getTimeLineClass();
                data[i].arrowClass = _this.getArrowClass();
            }
            _this.timeLine = data;
        }, function (error) { return _this.errorMessage = error; });
    };
    FileDetailComponent.prototype.getThreads = function (id) {
        var _this = this;
        this.logFileService.getThreads(id)
            .subscribe(function (data) {
            _this.threads = data;
        }, function (error) { return _this.errorMessage = error; });
    };
    FileDetailComponent.prototype.getQueries = function (id) {
        var _this = this;
        this.logFileService.getQueries(id)
            .subscribe(function (data) {
            _this.topQueries = data;
        }, function (error) { return _this.errorMessage = error; });
    };
    FileDetailComponent.prototype.getExceptions = function (id) {
        var _this = this;
        this.logFileService.getExceptions(id)
            .subscribe(function (data) {
            _this.exceptions = data;
        }, function (error) { return _this.errorMessage = error; });
    };
    FileDetailComponent.prototype.getDiagnostics = function (id) {
        var _this = this;
        this.logFileService.getDiagnostics(id)
            .subscribe(function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i].style = _this.getChartStyle();
                data[i].graph = new Array();
                for (var j = 0; j < data[i].diags.length; j++) {
                    data[i].graph.push(data[i].diags[j].diagValue);
                }
            }
            _this.diagnostics = data;
            _this.diagLoad = true;
        }, function (error) { return _this.errorMessage = error; });
    };
    FileDetailComponent.prototype.getArrowClass = function () {
        if (this.arrowClass === "arrow") {
            this.arrowClass = "arrow-alt";
        }
        else {
            this.arrowClass = "arrow";
        }
        return this.arrowClass;
    };
    ;
    FileDetailComponent.prototype.getLogFile = function (id) {
        var _this = this;
        this.logFileService.getLogFile(id)
            .subscribe(function (data) {
            _this.logFile = data;
            console.log(_this.getOutputFile(_this.logFile.outputFileName));
        }, function (error) { return _this.errorMessage = error; });
    };
    FileDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            _this.getLogFile(id);
            _this.getTimeLine(id);
            _this.getThreads(id);
            _this.getQueries(id);
            _this.getDiagnostics(id);
            _this.getExceptions(id);
        });
    };
    FileDetailComponent = __decorate([
        core_1.Component({
            selector: 'uploader',
            templateUrl: './app/components/file-detail.component.html',
            providers: [log_file_service_1.LogFileService]
        }), 
        __metadata('design:paramtypes', [log_file_service_1.LogFileService, router_1.ActivatedRoute])
    ], FileDetailComponent);
    return FileDetailComponent;
}());
exports.FileDetailComponent = FileDetailComponent;
//# sourceMappingURL=file-detail.component.js.map