import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
    name: 'status'
})
export class StatusPipe implements PipeTransform {

    constructor(private _sanitized: DomSanitizer) {
    }

    transform(value: string, prefix = ''): any {
        let buffer: string;

        if (is.not.null(value)) {
            switch (value.trim()) {
                case 'AVAILABILITY_STATUS_GREEN':
                    buffer = `<i class="material-icons status-up">check_circle</i>`;
                    break;
                case 'AVAILABILITY_STATUS_BLUE':
                    buffer = `<i class="material-icons status-unknow">error</i>`;
                    break;
                case 'AVAILABILITY_STATUS_RED':
                    buffer = `<i class="material-icons status-down">cancel</i>`;
                    break;
                default:
                    buffer = (value);
                    break;
            }
            return this._sanitized.bypassSecurityTrustHtml(`${prefix}${buffer}`);
        }
    }
}
