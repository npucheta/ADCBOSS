import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {NetscalerService} from '../../../../services/lb/netscaler.service';
import {NetscalerPersistenceGroupComponent} from '../../objects';
import {environment} from '../../../../shared/common';


@Component({
    selector: 'app-netscaler-persistence-groups-detail',
    templateUrl: '../../generic-object-chart-detail/generic-object-chart-detail.component.html',
    styleUrls: ['./netscaler-persistence-groups-detail.component.css']
})
export class NetscalerPersistenceGroupsDetailComponent extends GenericObjectChartDetailComponent {
    constructor(protected netscalerService: NetscalerService,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog, viewContainerRef);
    }

    ngOnInit(): void {
        this.title = 'Service detail';
        super.ngOnInit();
        this.component = this.netscalerService.getPersistenceGroup(this.id, this.hostname);
        if (environment.DEBUG) {
            console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        }
    }

    public appMapping(ip: String, port: String): void {
        /* console.log('mapping ' + ip + ' ' + port);

         this.devicesService.searchIPPort(ip, port).subscribe(
             data => {
                 let appMapping: AppMapping;
                 appMapping = data;
                 this.openChart(appMapping.virtuals, 'v');
             });*/
    }


    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/netscaler-persistencegroup');
        }, environment.DELAY_MODAL);
    }
}
