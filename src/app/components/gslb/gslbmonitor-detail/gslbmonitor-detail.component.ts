import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GSLBService} from '../../../services/gslb/gslb.service';
import {Observable} from 'rxjs/Observable';
import {DevicesService} from '../../../services/lb/devices.service';
import {AppMapping} from '../../lb/objects';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {PoolComponent, VirtualServerComponent,WideIPComponent} from '../GSLBobjects';
import {CanvasDialogComponent} from '../../../shared/canvas-dialog/canvas-dialog.component';
import {channels} from '../../../shared/common';
import {SharingDataService} from '../../../services/sharing-data.service';
import {GenericObjectChartDetailComponent} from '../../../components/lb/generic-object-chart-detail/generic-object-chart-detail.component';
import {MonitorComponent} from '../GSLBobjects';
import {GenericObjectDetailComponent} from '../../../components/lb/generic-object-detail/generic-object-detail.component';
import {environment} from '../../../shared/common';

@Component({
    selector: 'app-gslbmonitor-detail',
    templateUrl: '../../../components/lb/generic-object-detail/generic-object-detail.component.html',
    styleUrls: ['./gslbmonitor-detail.component.css']
})
export class GSLBMonitorDetailComponent extends GenericObjectDetailComponent {
  constructor(protected service: GSLBService,
                protected devicesService: DevicesService,
                protected route: ActivatedRoute,
                protected router: Router,
                protected dialog: MatDialog,
                protected sharingDataService: SharingDataService,
                protected viewContainerRef: ViewContainerRef) {
                super(route, router, dialog);
    }

    ngOnInit(): void {
        this.title = 'Monitor';
        super.ngOnInit();
        this.component = this.service.getMonitor(this.id);
    }


      public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/gslbmonitor');
        }, environment.DELAY_MODAL);
    }
}
