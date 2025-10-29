import {
    Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2
} from '@angular/core';

@Directive({selector: '[appCollapse]'})
export class CollapseDirective implements OnInit {
    @Output() public collapsed: EventEmitter<any> = new EventEmitter<any>(false);
    @Output() public expanded: EventEmitter<any> = new EventEmitter<any>(false);

    private _el: ElementRef;
    private _renderer: Renderer2;
    @Input() id: number;
    @Input() isParent: boolean;
    @Input() isCollapse: boolean;

    public constructor(el: ElementRef, renderer: Renderer2) {
        this._el = el;
        this._renderer = renderer;
    }

    public ngOnInit(): void {
    }

    @HostListener('click') onClick() {
        this.toggle();
    }

    private toggle(): void {
        const node: ElementRef = this._el.nativeElement.children[0].children[3].children[0];
        if (this.isCollapse) {
            this.show(node);
        } else {
            this.hide(node);
        }
    }

    public hide(node: ElementRef): void {
        if (this.isParent) {
            this._renderer.setStyle(node, 'display', 'none');
            this.isCollapse = true;
        }

        this.collapsed.emit(this);
    }

    public show(node: ElementRef): void {

        if (this.isParent) {
            this._renderer.setStyle(node, 'display', 'block');
            this.isCollapse = false;
        }

        this.expanded.emit(this);
    }
}
