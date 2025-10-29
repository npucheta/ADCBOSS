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
import {environment} from '../../../shared/common';

@Component({
    selector: 'app-wide-ipdetail',
    templateUrl: './wide-ipdetail.component.html',
    styleUrls: ['./wide-ipdetail.component.css']
})
export class WideIPDetailComponent extends GenericObjectChartDetailComponent {
    wideip: Observable<WideIPComponent>;
    pools: Observable<PoolComponent[]>;

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
        this.title = 'WideIP Detail';
        super.ngOnInit();
        this.wideip = this.service.getWideip(this.id);
        this.pools = this.service.getPoolsFromWideIP(this.id);
    }

    public appMapping(wideip: string): void {
        console.log('mapping ' + wideip);
        
        //this.devicesService.appMappingString(wideip,this.hostname).subscribe(
        this.devicesService.appMappingIPPort(wideip,'ByName',this.hostname).subscribe(
            data => {
                let appMapping: AppMapping;
                appMapping = data;
                console.log(appMapping);
                this.openChart(appMapping.wideips, 'w');
            });
    }

   public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/wideip');
        }, environment.DELAY_MODAL);
    }
}
