import {Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
    selector: 'app-custom-card',
    templateUrl: './custom-card.component.html'
})
export class CustomCardComponent implements OnInit {

    @Input() title: string;
    @Input() hasButton: false;
    @Input() bodyTpl: TemplateRef<any>;
    @Input() headButtonTpl: TemplateRef<any>;
    @Input() actionTpl: TemplateRef<any>;
    @Input() hasAction = false;
    @Input() isDialog = false;

    constructor() {
    }

    ngOnInit() {
    }
}
