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
import {environment} from '../../../shared/common';

@Component({
    selector: 'app-gslbpool-detail',
    templateUrl: './gslbpool-detail.component.html',
    styleUrls: ['./gslbpool-detail.component.css']
})
export class GSLBPoolDetailComponent extends GenericObjectChartDetailComponent {
    pool: Observable<PoolComponent>;
    virtualservers: Observable<VirtualServerComponent>;

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
        this.title = 'Pools';
        super.ngOnInit();
        this.pool = this.service.getPool(this.id);
        this.virtualservers = this.service.getVirtualServersFromPool(this.id);
    }

    public appMapping(wideip: string): void {
            console.log('mapping ' + wideip);

        this.devicesService.appMappingIPPort(wideip,'ByName',this.hostname).subscribe(
        //this.devicesService.appMappingIPPort(wideip,'ByName',this.hostname).subscribe(
            data => {
                let appMapping: AppMapping;
                appMapping = data;
                console.log('appMapping', appMapping);
                this.openChart(appMapping.wideips, 'w');
            });
    }

    public appMappingGSLBPoolMember(ip: string, port: String): void {
            console.log('mapping ' + ip + ' ' + port);

        this.devicesService.appMappingIPPort(ip, port,this.hostname).subscribe(
            data => {
                let appMapping: AppMapping;
                appMapping = data;
                console.log('appMappingGSLBPoolMember', appMapping.wideips[0]);
                this.openChart(appMapping.wideips, 'w');
            });
    }

  public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/gslbpool');
        }, environment.DELAY_MODAL);
    }
}
