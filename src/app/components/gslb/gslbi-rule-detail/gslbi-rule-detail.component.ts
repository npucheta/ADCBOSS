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
import {iRuleComponent} from '../GSLBobjects';
import {environment} from '../../../shared/common';

@Component({
    selector: 'app-gslbi-rule-detail',
    templateUrl: '../../../components/lb/generic-object-chart-detail/generic-object-chart-detail.component.html',
    styleUrls: ['./gslbi-rule-detail.component.css']
})
export class GSLBiRuleDetailComponent extends GenericObjectChartDetailComponent {
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
        this.title = 'iRules';
        this.isDialog = true;

        if (this.route.snapshot.params['id']) {
            this.id = this.route.snapshot.params['id'];
            this.isDialog = false;
        }
        this.component = this.service.getiRule(this.id);
    }

      public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/gslbirule');
        }, environment.DELAY_MODAL);
    }
}
