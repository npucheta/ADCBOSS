import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {RadwareService} from '../../../../services/lb/radware.service';
import {RadwareVirtualServiceComponent} from '../../objects';
import {environment} from '../../../../shared/common';
import {AppMapping, NetscalerVirtualComponent, NetscalerVirtualServiceComponent} from '../../objects';

@Component({
    selector: 'app-radware-virtual-service-detail',
    templateUrl: './radware-virtual-service-detail.component.html',
    styleUrls: ['./radware-virtual-service-detail.component.css']
})
export class RadwareVirtualServiceDetailComponent extends GenericObjectChartDetailComponent {
    virtualservice: Observable<RadwareVirtualServiceComponent>;
    servergroups: Observable<RadwareVirtualServiceComponent>;
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
        this.virtualservice = this.radwareService.getVirtualService(this.id, this.hostname);
        this.servergroups = this.radwareService.getServerGroupsFromServices(this.id, this.hostname);
        if (environment.DEBUG) {
            console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        }
    }

    public appMapping(index: string, port: String): void {
        if (environment.DEBUG) {
            console.log('mapping ' + index + ' ' + port);
        }
        this.radwareService.appMappingIPPort(index, port,this.hostname).subscribe(
            data => {
                let appMapping: AppMapping;
                appMapping = data;
                this.openChart(appMapping.virtuals, 'v');
            });
    }
    
    
    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/radware-virtualservice');
        }, environment.DELAY_MODAL);
    }
}
