import {Component, ViewContainerRef} from '@angular/core';
import {AppMapping, MonitorComponent, PoolComponent, PoolMemberComponent} from '../../objects';
import {ActivatedRoute, Router} from '@angular/router';
import {DevicesService} from '../../../../services/lb/devices.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {environment} from '../../../../shared/common';
import {SharingDataService} from '../../../../services/sharing-data.service';

@Component({
    selector: 'app-pool-detail',
    templateUrl: './pool-detail.component.html',
    styleUrls: ['./pool-detail.component.css']
})
export class PoolDetailComponent extends GenericObjectChartDetailComponent {
    pool: Observable<PoolComponent>;
    poolmembers: Observable<PoolMemberComponent>;
    monitors: Observable<MonitorComponent>;
   
    constructor(protected devicesService: DevicesService,
                protected route: ActivatedRoute,
                protected router: Router,
                protected dialog: MatDialog,
                public sharingDataService: SharingDataService,
                protected viewContainerRef: ViewContainerRef) {
        super(route, router, dialog, viewContainerRef);
    }

    ngOnInit(): void {
        this.title = 'Pool detail';
        super.ngOnInit();
        console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        this.pool = this.devicesService.getPool(this.id, this.hostname);
        this.poolmembers = this.devicesService.getPoolMember(this.id, this.hostname);
        this.monitors = this.devicesService.getMonitorsFromPool(this.id, this.hostname);
    }

    public appMapping(pool: string, hostname: string): void {
        if (environment.DEBUG) {
            console.log('mapping ' + pool + ' ' + hostname);
        }

        this.devicesService.appMappingIPPort(pool,'ByName',this.hostname).subscribe( 
            data => {
                let appMapping: AppMapping;
                appMapping = data;
                console.log('appMapping', appMapping);
                console.log ('Amount of virtuals for this pool '+appMapping.virtuals.length);
                this.openChart(appMapping.virtuals, 'v');
            });
    }

    // TODO implement in future and move to utils and add close automatic
    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/pool');
        }, environment.DELAY_MODAL);
    }
}
