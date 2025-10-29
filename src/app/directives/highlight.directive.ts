import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective {
    @Input() color: string;

    constructor(private _el: ElementRef) {
    }

    @HostListener('mouseenter')
    over() {
        this.highlightColor(this.color || 'yellow');
    }

    @HostListener('mouseleave')
    leave() {
        this.highlightColor(null);
    }

    private highlightColor(color: string) {
        this._el.nativeElement.style.backgroundColor = color;
    }
}
