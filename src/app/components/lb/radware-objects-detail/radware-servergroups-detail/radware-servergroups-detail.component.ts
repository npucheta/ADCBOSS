import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {RadwareService} from '../../../../services/lb/radware.service';
import {RadwareServerGroupComponent} from '../../objects';
import {environment} from '../../../../shared/common';
import {AppMapping, MonitorComponent, PoolComponent, PoolMemberComponent} from '../../objects';

@Component({
    selector: 'app-radware-servergroups-detail',
    templateUrl: './radware-servergroups-detail.component.html',
    styleUrls: ['./radware-servergroups-detail.component.css']
})
export class RadwareServergroupsDetailComponent extends GenericObjectChartDetailComponent {
    servergroup: Observable<RadwareServerGroupComponent>;
    servers;
    constructor(protected radwareService: RadwareService,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog, viewContainerRef);
    }

    ngOnInit(): void {
        this.title = 'Virtual Service detail';
        super.ngOnInit();
        this.servergroup = this.radwareService.getServerGroup(this.id, this.hostname);
        this.servers = this.radwareService.getServersFromServerGroup(this.id, this.hostname);
        if (environment.DEBUG) {
            console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        }
    }


    public appMapping(pool: string, hostname: string): void {
        if (environment.DEBUG) {
            console.log('mapping ' + pool + ' ' + hostname);
        }

        this.radwareService.appMappingIPPort(pool,'ByName',this.hostname).subscribe( 
            data => {
                let appMapping: AppMapping;
                appMapping = data;
                console.log('appMapping', appMapping);
                this.openChart(appMapping.virtuals, 'v');
            });
    }


    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/radware-servergroup');
        }, environment.DELAY_MODAL);
    }
}
