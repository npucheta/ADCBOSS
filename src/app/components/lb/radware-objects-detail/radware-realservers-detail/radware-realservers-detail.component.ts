import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {RadwareService} from '../../../../services/lb/radware.service';
import {RadwareServerComponent} from '../../objects';
import {environment} from '../../../../shared/common';
import {AppMapping, MonitorComponent, PoolComponent, PoolMemberComponent} from '../../objects';

@Component({
    selector: 'app-radware-realservers-detail',
    templateUrl: '../../generic-object-chart-detail/generic-object-chart-detail.component.html',
    styleUrls: ['./radware-realservers-detail.component.css']
})
export class RadwareRealserversDetailComponent extends GenericObjectChartDetailComponent {
    constructor(protected radwareService: RadwareService,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog, viewContainerRef);
    }
    

    ngOnInit(): void {
        this.title = 'Server detail';
        super.ngOnInit();
        this.component = this.radwareService.getServer(this.id, this.hostname);
        if (environment.DEBUG) {
            console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        }
    }

    public appMapping(): void {

        this.radwareService.appMappingIPPort(this.id,'ByName',this.hostname).subscribe( 
            data => {
                let appMapping: AppMapping;
                appMapping = data;
                console.log('appMapping', this.id);
                this.openChart(appMapping.virtuals, 'v');
            });
    }

     public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/radware-server');
        }, environment.DELAY_MODAL);
    }
}
