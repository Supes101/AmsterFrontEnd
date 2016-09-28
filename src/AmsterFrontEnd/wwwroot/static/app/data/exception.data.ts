import {ExceptionTime} from './exception-time.data';

export class Exception {
    id: string;
    exception: string;
    exceptionCount: number;
    stackTrace: string;
    exceptionTimes: ExceptionTime[];

    showDesc: boolean = false;
}