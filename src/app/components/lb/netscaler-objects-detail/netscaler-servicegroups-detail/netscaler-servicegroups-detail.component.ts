import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {NetscalerService} from '../../../../services/lb/netscaler.service';
import {NetscalerServiceGroupComponent,AppMapping} from '../../objects';
import {environment} from '../../../../shared/common';


@Component({
    selector: 'app-netscaler-servicegroups-detail',
    templateUrl: './netscaler-servicegroups-detail.component.html',
    styleUrls: ['./netscaler-servicegroups-detail.component.css']
})
export class NetscalerServicegroupsDetailComponent extends GenericObjectChartDetailComponent {
    servicegroups: Observable<NetscalerServiceGroupComponent>;
    monitors;
    servers;


    // @Output() public navToggle: EventEmitter<any> = new EventEmitter<any>(false); // close side-nav before closing dialog for fix issue
    constructor(protected netscalerService: NetscalerService,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog, viewContainerRef);
    }

    ngOnInit(): void {
        this.title = 'Service detail';
        super.ngOnInit();
        this.servicegroups = this.netscalerService.getServiceGroup(this.id, this.hostname);
        this.monitors = this.netscalerService.getMonitorsFromServiceGroup(this.id, this.hostname);
        this.servers = this.netscalerService.getServersFromServiceGroup(this.id, this.hostname);
        if (environment.DEBUG) {
            console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        }
    }

    public appMapping(pool: string, hostname: String): void {
        if (environment.DEBUG) {
            console.log('mapping ' + pool + ' ' + hostname);
        }

        this.netscalerService.appMappingIPPort(pool,'ByName',this.hostname).subscribe( 
            data => {
                let appMapping: AppMapping;
                appMapping = data;
                console.log('appMapping', appMapping);
                console.log ('Amount of virtuals for this pool '+appMapping.virtuals.length);
                this.openChart(appMapping.virtuals, 'v');
            });
    }



     public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/netscaler-servicegroup');
        }, environment.DELAY_MODAL);
    }
}
