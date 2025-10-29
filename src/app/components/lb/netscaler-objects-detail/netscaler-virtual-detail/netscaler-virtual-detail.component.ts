import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {NetscalerService} from '../../../../services/lb/netscaler.service';
import {
    AppMapping,
    NetscalerServiceGroupComponent,
    NetscalerVirtualComponent,
    NetscalerVirtualServiceComponent
} from '../../objects';
import {environment} from '../../../../shared/common';

@Component({
    selector: 'app-netscaler-virtual',
    templateUrl: './netscaler-virtual-detail.component.html',
    styleUrls: ['./netscaler-virtual-detail.component.css']
})
export class NetscalerVirtualDetailComponent extends GenericObjectChartDetailComponent {
    virtual: Observable<NetscalerVirtualComponent>;
    services: Observable<NetscalerVirtualServiceComponent>;
    servicegroups: Observable<NetscalerServiceGroupComponent>;
    
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
        this.virtual = this.netscalerService.getVirtual(this.id, this.hostname);
        this.services = this.netscalerService.getServicesFromVirtual(this.id, this.hostname);
        this.servicegroups = this.netscalerService.getServiceGroupsFromVirtual(this.id, this.hostname);
        if (environment.DEBUG) {
            console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        }
    }

    public appMapping(ip: string, port: String): void {
        if (environment.DEBUG) {
            console.log('mapping ' + ip + ' ' + port);
        }
        this.netscalerService.appMappingIPPort(ip, port,this.hostname).subscribe(
            data => {
                let appMapping: AppMapping;
                appMapping = data;
                this.openChart(appMapping.virtuals, 'v');
            });
    }

   public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/netscaler-virtual');
        }, environment.DELAY_MODAL);
    }
}
