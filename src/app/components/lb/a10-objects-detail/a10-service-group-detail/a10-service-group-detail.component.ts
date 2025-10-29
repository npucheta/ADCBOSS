import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {A10Service} from '../../../../services/lb/a10.service';
import {
    AppMapping,
    LBComponent
} from '../../objects';
import {environment} from '../../../../shared/common';

@Component({
  selector: 'app-a10-service-group-detail',
  templateUrl: './a10-service-group-detail.component.html',
  styleUrls: ['./a10-service-group-detail.component.css']
})
export class A10ServiceGroupDetailComponent extends GenericObjectChartDetailComponent {
    servers: Observable<LBComponent>;
    servicegroups: Observable<LBComponent>;

    constructor(protected a10Service: A10Service,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog, viewContainerRef);
    }

    ngOnInit(): void {
        this.title = 'Virtual detail';
        super.ngOnInit();
        this.servicegroups = this.a10Service.getServiceGroup(this.id, this.hostname);
        this.servers = this.a10Service.getServersFromServiceGroup(this.id, this.hostname);
        if (environment.DEBUG) {
            console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        }
    }

    public appMapping(pool: string, hostname: string): void {
        if (environment.DEBUG) {
            console.log('mapping ' + pool + ' ' + hostname);
        }

        this.a10Service.appMappingIPPort(pool,'ByName',this.hostname).subscribe( 
            data => {
                let appMapping: AppMapping;
                appMapping = data;
                console.log('appMapping', appMapping);
                this.openChart(appMapping.virtuals, 'v');
            });
    }

    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/a10-service-group');
        }, environment.DELAY_MODAL);
    }
}
