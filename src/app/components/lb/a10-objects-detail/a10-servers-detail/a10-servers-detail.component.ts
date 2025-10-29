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
  selector: 'app-a10-servers-detail',
  templateUrl: '../../generic-object-chart-detail/generic-object-chart-detail.component.html',
  styleUrls: ['./a10-servers-detail.component.css']
})
export class A10ServersDetailComponent extends GenericObjectChartDetailComponent {
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
        this.component = this.a10Service.getServer(this.id, this.hostname);
        if (environment.DEBUG) {
            console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        }
    }

    public appMapping(): void {
        if (environment.DEBUG) {
            console.log('mapping ' + this.id + ' ' + this.hostname);
        }

        this.a10Service.appMappingIPPort(this.id,'ByName',this.hostname).subscribe( 
            data => {
                let appMapping: AppMapping;
                appMapping = data;
                console.log('appMapping', appMapping);
                this.openChart(appMapping.virtuals, 'v');
            });
    }

    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/a10-server');
        }, environment.DELAY_MODAL);
    }
}
