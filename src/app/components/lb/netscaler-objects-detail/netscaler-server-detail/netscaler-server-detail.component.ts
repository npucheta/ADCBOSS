import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {NetscalerService} from '../../../../services/lb/netscaler.service';
import {NetscalerServerComponent,AppMapping} from '../../objects';
import {environment} from '../../../../shared/common';


@Component({
    selector: 'app-netscaler-server-detail',
    templateUrl: '../../generic-object-chart-detail/generic-object-chart-detail.component.html', // HTML template inheritance not supported, so we import it
    styleUrls: ['./netscaler-server-detail.component.css']
})
export class NetscalerServerDetailComponent extends GenericObjectChartDetailComponent {
    constructor(protected netscalerService: NetscalerService,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog, viewContainerRef);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.title = 'Netscaler Server';
        this.component = this.netscalerService.getServer(this.id, this.hostname);
        if (environment.DEBUG) {
            console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        }
    }

    public appMapping(): void {
        this.netscalerService.appMappingIPPort(this.id,'ByName',this.hostname).subscribe(
            data => {
                let appMapping: AppMapping;
                appMapping = data;
                console.log(appMapping);
                this.openChart(appMapping.virtuals, 'v');
            });
    }

     public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/netscaler-server');
        }, environment.DELAY_MODAL);
    }
}
