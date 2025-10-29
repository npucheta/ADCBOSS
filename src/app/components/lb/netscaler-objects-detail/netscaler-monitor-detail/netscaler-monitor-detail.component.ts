import {Component, OnInit, Input, OnDestroy, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DevicesService} from '../../../../services/lb/devices.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {CanvasDialogComponent} from '../../../../shared/canvas-dialog/canvas-dialog.component';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {NetscalerService} from '../../../../services/lb/netscaler.service';
import {
    NetscalerMonitorComponent,
    AppMapping
} from '../../objects';
import {environment} from '../../../../shared/common';
import {GenericObjectDetailComponent} from '../../generic-object-detail/generic-object-detail.component';

@Component({
    selector: 'app-netscaler-monitor-detail',
    templateUrl: '../../generic-object-detail/generic-object-detail.component.html',
    styleUrls: ['./netscaler-monitor-detail.component.css']
})
export class NetscalerMonitorDetailComponent extends GenericObjectDetailComponent {
    constructor(protected netscalerService: NetscalerService,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog);
    }

    ngOnInit(): void {
        this.title = 'Monitor detail';
        super.ngOnInit();
        console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        this.component = this.netscalerService.getMonitor(this.id, this.hostname);
    }


    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/netscaler-monitor');
        }, environment.DELAY_MODAL);
    }
}
