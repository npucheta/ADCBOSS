import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'common'
})
export class CommonPipe implements PipeTransform {

    transform(value: string, upper = false): string {
        // const buffer = value.replace('/Common/', '');
        // return (upper) ? (buffer.toUpperCase()) : (buffer);
        return value;
    }
}
