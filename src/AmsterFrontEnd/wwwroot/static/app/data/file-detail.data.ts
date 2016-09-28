import {DiagInfo} from './diag-info.data';
import {ThreadFile} from './thread-file.data';
import {TimeLog} from './time-log.data';
import {Exception} from './exception.data';
import {Query} from './query.data';

export class FileDetail {
    id: string;
    shortName: string;
    description: string;
    outputFileName: string;
    realFileName: string;
    createDate: Date;
    diagInfo: DiagInfo[];
    threadFiles: ThreadFile[];
    timeLog: TimeLog[];
    exceptions: Exception[];
    topQueries: Query[];
}