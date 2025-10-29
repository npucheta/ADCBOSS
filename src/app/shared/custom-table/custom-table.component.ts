import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-custom-table',
    templateUrl: './custom-table.component.html',
    styleUrls: []
})
export class CustomTableComponent implements OnInit {
    @Input()
    title: string;
    @Input()
    type: string;

    constructor() {
    }

    ngOnInit() {
    }
}
