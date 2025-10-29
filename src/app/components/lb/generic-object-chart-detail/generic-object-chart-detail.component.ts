import {GenericObjectDetailComponent} from '../generic-object-detail/generic-object-detail.component';
import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {CanvasDialogComponent} from '../../../shared/canvas-dialog/canvas-dialog.component';

@Component({
    selector: 'app-generic-object-chart-detail',
    templateUrl: './generic-object-chart-detail.component.html',
    styleUrls: ['./generic-object-chart-detail.component.css']
})
export class GenericObjectChartDetailComponent extends GenericObjectDetailComponent {

    title: string;
    dialogRef: MatDialogRef<any>;
    @Input()
    id: string;
    @Input()
    hostname: string;
    @Input()
    vendor: string;
    // Custom
    miniTitle: string;
    size: string;
    isDialog: boolean;
    //
    // @Output() public navToggle: EventEmitter<any> = new EventEmitter<any>(false); // close side-nav before closing dialog for fix issue
    constructor(protected route: ActivatedRoute,
                protected router: Router,
                protected dialog: MatDialog,
                protected viewContainerRef: ViewContainerRef) {
        super(route, router, dialog);
    }
    
    protected isIPaddress(ipaddress) {  
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
            return (true)  
    }  
    return (false)  
    }

    public openChart(object: any, type: string): void {
        if ('v' === type || 'w' === type) {
            const config = new MatDialogConfig();
            config.viewContainerRef = this.viewContainerRef;
            this.dialogRef = this.dialog.open(CanvasDialogComponent, config);
            this.dialogRef.componentInstance.options = object;
            this.dialogRef.componentInstance.type = type;
            this.dialogRef.afterClosed().subscribe(() => {
                this.dialogRef = null;
            });
        }
    }
}
