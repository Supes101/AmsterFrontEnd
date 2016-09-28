import {Diag} from './diag.data';

export class DiagInfo {
    id: string;
    diagName: string;
    highWaterMark: string;
    highWaterTime: string;
    diags: Diag[];
    graph: number[] = new Array();
    style: string;
}