import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {A10Service} from '../../../../services/lb/a10.service';
import {
    AppMapping,
    NetscalerServiceGroupComponent,
    NetscalerVirtualComponent,
    NetscalerVirtualServiceComponent,
    LBComponent
} from '../../objects';
import {environment} from '../../../../shared/common';

@Component({
  selector: 'app-a10-virtual-service-detail',
  templateUrl: './a10-virtual-service-detail.component.html',
  styleUrls: ['./a10-virtual-service-detail.component.css']
})
export class A10VirtualServiceDetailComponent extends GenericObjectChartDetailComponent {
    virtual: Observable<LBComponent>;
    services: Observable<LBComponent>;

    constructor(protected a10Service: A10Service,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog, viewContainerRef);
    }

    ngOnInit(): void {
        this.title = 'Virtual Service detail';
        super.ngOnInit();
        this.virtual = this.a10Service.getVirtualService(this.id, this.hostname);
        if (environment.DEBUG) {
            console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        }
    }

    public appMapping(ip: string, port: String): void {
        if (environment.DEBUG) {
            console.log('mapping ' + ip + ' ' + port);
        }
        this.a10Service.appMappingIPPort(ip, port,this.hostname).subscribe(
            data => {
                let appMapping: AppMapping;
                appMapping = data;
                this.openChart(appMapping.virtuals, 'v');
            });
    }

    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/a10-virtual-service');
        }, environment.DELAY_MODAL);
    }
}
