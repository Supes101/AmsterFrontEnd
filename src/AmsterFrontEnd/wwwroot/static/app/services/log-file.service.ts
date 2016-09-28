import { Injectable } from '@angular/core';
import {Http, Response,Headers,RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';

import '../rxjs-operators';
import {LogFile} from '../data/log-file.data';
import {FileDetail} from '../data/file-detail.data';
import {TimeLog} from '../data/time-log.data';
import {ThreadFile} from '../data/thread-file.data';
import {Query} from '../data/query.data';
import {DiagInfo} from '../data/diag-info.data';
import {Exception} from '../data/exception.data';

import {LogProgress} from '../data/log-progress.data';

@Injectable()
export class LogFileService {

    hostUrl: String = "http://CWILLIA201:7975/amster-1.0"

    constructor(private http: Http) { }

    getLogFiles(): Observable<LogFile[]> {
        
        return this.http.get(this.hostUrl+'/rest/logfile')
           // .do(data => console.log(data.json())) // eyeball results in the console
            .map(res => res.json())
            .catch(this.handleError);
    }

    getLogFile(id: String): Observable<LogFile> {

        return this.http.get(this.hostUrl +'/rest/logfile?id='+id)
           // .do(data => console.log(data.json()[0].realFileName)) // eyeball results in the console
            .map(res => res.json()[0])
            .catch(this.handleError);
    }

    getTimeLine(id: String): Observable<TimeLog[]> {

        return this.http.get(this.hostUrl +'/rest/timeline?id=' + id)
            // .do(data => console.log(data.json()[0].realFileName)) // eyeball results in the console
            .map(res => res.json())
            .catch(this.handleError);
    }

    getThreads(id: String): Observable<ThreadFile[]> {

        return this.http.get(this.hostUrl +'/rest/threads?id=' + id)
            // .do(data => console.log(data.json()[0].realFileName)) // eyeball results in the console
            .map(res => res.json())
            .catch(this.handleError);
    }

    getQueries(id: String): Observable<Query[]> {

        return this.http.get(this.hostUrl +'/rest/top-queries?id=' + id)
            // .do(data => console.log(data.json()[0].realFileName)) // eyeball results in the console
            .map(res => res.json())
            .catch(this.handleError);
    
    }

    getDiagnostics(id: String): Observable<DiagInfo[]> {

        return this.http.get(this.hostUrl +'/rest/diagnostics?id=' + id)
            // .do(data => console.log(data.json()[0].realFileName)) // eyeball results in the console
            .map(res => res.json())
            .catch(this.handleError);

    }

    getExceptions(id: String): Observable<Exception[]> {

        return this.http.get(this.hostUrl +'/rest/exceptions?id=' + id)
            // .do(data => console.log(data.json()[0].realFileName)) // eyeball results in the console
            .map(res => res.json())
            .catch(this.handleError);

    }

    checkUpload(): Observable<LogProgress> {
  
        return this.http.get(this.hostUrl +'/uploadlog')
            // .do(data => console.log(data.json())) // eyeball results in the console
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }




     makeFileRequest(short_name: String, description: String, file: File): Observable<any>{
        return Observable.create(observer => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();
               
                formData.append("short_name", short_name);
                formData.append("description",description);
                formData.append("file", file, file.name);
            

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.response);
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.upload.onprogress = (event) => {
                console.log(event);
            };

        
            xhr.open('POST', this.hostUrl+'uploadlog', true);
           // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send(formData);
        });
    }
}


