import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {NetscalerService} from '../../../../services/lb/netscaler.service';
import {NetscalerVirtualComponent} from '../../objects';
import {environment} from '../../../../shared/common';

@Component({
    selector: 'app-netscaler-csvirtual',
    templateUrl: './netscaler-csvirtual-detail.component.html',
    styleUrls: ['./netscaler-csvirtual-detail.component.css']
})
export class NetscalerCSVirtualDetailComponent extends GenericObjectChartDetailComponent {
    virtual: Observable<NetscalerVirtualComponent>;
    constructor(protected netscalerService: NetscalerService,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog, viewContainerRef);
    }

    ngOnInit(): void {
        this.title = 'Virtual detail';
        super.ngOnInit();
        this.virtual = this.netscalerService.getCSVirtual(this.id, this.hostname);
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
            super.goSelf('/netscaler-csvirtual');
        }, environment.DELAY_MODAL);
    }
}
