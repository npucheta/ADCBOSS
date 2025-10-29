import {Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
    selector: 'app-custom-layout',
    templateUrl: './custom-layout.component.html',
    styles: []
})
export class CustomLayoutComponent implements OnInit {

    @Input()
    isDialog: false;
    @Input()
    size = 80;
    @Input()
    bodyTpl: TemplateRef<any>;

    constructor() {
    }

    ngOnInit() {
    }
}
