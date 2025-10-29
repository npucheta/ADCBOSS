import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'isNull'
})
export class IsNullPipe implements PipeTransform {

    transform(value: any, tail: any = '-'): string | number | null {
        return (is.number(value) || is.string(value) || is.object(value)) ? (value) : (tail);
    }
}
