import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-doughnut',
    templateUrl: './doughnut.component.html',
    styles: []
})
export class DoughnutComponent {
    @Input()
    public labels: string[];
    @Input()
    public data: number[];
    @Input()
    public legend = false;
    @Input()
    public color: Array<any> | boolean;
    @Input()
    public width = 200;
    @Input()
    public height = 200;
    public readonly TYPE = 'doughnut';

    constructor() {
    }

    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }
}
