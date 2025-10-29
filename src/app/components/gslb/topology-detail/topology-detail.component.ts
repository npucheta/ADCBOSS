import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GSLBService} from '../../../services/gslb/gslb.service';
import {Observable} from 'rxjs/Observable';
import {DevicesService} from '../../../services/lb/devices.service';
import {AppMapping} from '../../lb/objects';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {PoolComponent, WideIPComponent} from '../GSLBobjects';
import {CanvasDialogComponent} from '../../../shared/canvas-dialog/canvas-dialog.component';
import {channels} from '../../../shared/common';
import {SharingDataService} from '../../../services/sharing-data.service';
import {GenericObjectChartDetailComponent} from '../../../components/lb/generic-object-chart-detail/generic-object-chart-detail.component';
import {TopologyComponent} from '../GSLBobjects';
import {environment} from '../../../shared/common';

@Component({
    selector: 'app-topology-detail',
    templateUrl: '../../../components/lb/generic-object-chart-detail/generic-object-chart-detail.component.html',
    styleUrls: ['./topology-detail.component.css']
})
export class TopologyDetailComponent extends GenericObjectChartDetailComponent {

  constructor(protected service: GSLBService,
                protected devicesService: DevicesService,
                protected route: ActivatedRoute,
                protected router: Router,
                protected dialog: MatDialog,
                protected sharingDataService: SharingDataService,
                protected viewContainerRef: ViewContainerRef) {
                super(route, router, dialog, viewContainerRef);
    }

    ngOnInit(): void {
        this.title = 'Topologies';
        super.ngOnInit();
        this.component = this.service.getTopology(this.id);
    }

  public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/topology');
        }, environment.DELAY_MODAL);
    }
}