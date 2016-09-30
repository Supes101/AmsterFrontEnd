import { Component, OnInit, OnChanges, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { LogFileService }   from '../services/log-file.service';
import { LogFile }   from '../data/log-file.data';
import { TimeLog }   from '../data/time-log.data';
import { ThreadFile }   from '../data/thread-file.data';
import { Query }   from '../data/query.data';
import { DiagInfo }   from '../data/diag-info.data';
import { Exception }   from '../data/exception.data';

declare var $: any;


@Component({
    selector: 'uploader',
    templateUrl: './app/components/file-detail.component.html',
    providers: [LogFileService]
})

export class FileDetailComponent implements OnInit, AfterViewChecked{

    errorMessage: String = "";
    logFile: LogFile;
    timeLine: TimeLog[];
    threads: ThreadFile[];
    topQueries: Query[];
    diagnostics: DiagInfo[];
    exceptions: Exception[];

    timeLineClass = "timeline-item"
    arrowClass = "arrow";

    charts = ['terques-chart', 'purple-chart', 'green-chart', 'red-chart', 'yellow-chart', 'blue-chart'];
    chartPos = 0;

    doneSon = false;

    diagLoad = false;

    constructor(private logFileService: LogFileService, private route: ActivatedRoute) { }


    public ngAfterViewChecked(): void {
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
    }  

    ngOnChanges(changes: { [propertyName: string]:any }) {
        console.log('here');
    }

    getChartStyle() {
        this.chartPos++;
        if (this.chartPos > 5) {
            this.chartPos = 0;
        }
        return this.charts[this.chartPos];
    }

    moreClick(e) {
        e.showDesc = true;
    }

    lessClick(e) {
        e.showDesc = false;
    }

    getOutputFile(fileName) {
        return "http://CERIW01:7975/uploaded_logs/" + fileName;
    }

    getTheFirstBit(s) {
        if (s.length < 80) {
            return s
        } else {
            return s.substring(0, 79) + "...";
        }
    }

    getTimeLineClass(){
        if (this.timeLineClass === "timeline-item") {
            this.timeLineClass = "timeline-item alt";
        } else {
            this.timeLineClass = "timeline-item";
        }

        return this.timeLineClass;
    };

    getTimeLine(id: string) {
        this.logFileService.getTimeLine(id)
            .subscribe(
            data => {
                for (var i = 0; i < data.length; i++) {

                    data[i].timeLineClass = this.getTimeLineClass();
                    data[i].arrowClass = this.getArrowClass();
 
                }
    
                this.timeLine = data;
            },
            error => this.errorMessage = <any>error);
    }

    getThreads(id: string) {
        this.logFileService.getThreads(id)
            .subscribe(
            data => {
                this.threads = data;
            },
            error => this.errorMessage = <any>error);
    }

    getQueries(id: string) {
        this.logFileService.getQueries(id)
            .subscribe(
            data => {
                this.topQueries = data;
            },
            error => this.errorMessage = <any>error);
    }

    getExceptions(id: string) {
        this.logFileService.getExceptions(id)
            .subscribe(
            data => {
                this.exceptions = data;
            },
            error => this.errorMessage = <any>error);
    }

    getDiagnostics(id: string) {
        this.logFileService.getDiagnostics(id)
            .subscribe(
            data => {  
               
                for (var i = 0; i < data.length; i++) {
            
                    data[i].style = this.getChartStyle();
                    data[i].graph = new Array();
                    for (var j = 0; j < data[i].diags.length; j++) {
                        data[i].graph.push(data[i].diags[j].diagValue);
                    }

                }
                this.diagnostics = data;
                this.diagLoad = true;

            },
            error => this.errorMessage = <any>error);
    }

   
    getArrowClass() {
        if (this.arrowClass === "arrow") {
            this.arrowClass = "arrow-alt";
        } else {
            this.arrowClass = "arrow";
        }

        return this.arrowClass;
    };


    getLogFile(id:string) {
        this.logFileService.getLogFile(id)
            .subscribe(
            data => {  
                this.logFile = data;
                console.log(this.getOutputFile(this.logFile.outputFileName));
            },
            error => this.errorMessage = <any>error);
    }

    ngOnInit(): void {

        this.route.params.forEach((params: Params) => {
            var id: string = params['id'];
            this.getLogFile(id);
            this.getTimeLine(id);
            this.getThreads(id);
            this.getQueries(id);
            this.getDiagnostics(id);
            this.getExceptions(id);
        });

    }

   

}