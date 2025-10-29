import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {NetscalerService} from '../../../../services/lb/netscaler.service';
import {NetscalerComponent} from '../../objects';
import {environment} from '../../../../shared/common';

@Component({
    selector: 'app-netscaler-crpolicy-detail',
    templateUrl: '../../generic-object-detail/generic-object-detail.component.html', // HTML template inheritance not supported, so we import it
    styleUrls: ['./netscaler-crpolicy-detail.component.css']
})
export class NetscalerCRPolicyDetailComponent extends GenericObjectChartDetailComponent {
    constructor(protected netscalerService: NetscalerService,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog, viewContainerRef);
    }

    ngOnInit(): void {
        this.miniTitle = 'Virtual detail.';
        super.ngOnInit();
        console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        this.component = this.netscalerService.getCRPolicy(this.id, this.hostname);
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
            super.goSelf('/netscaler-crpolicy');
        }, environment.DELAY_MODAL);
    }
}
