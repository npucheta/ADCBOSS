import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {NetscalerService} from '../../../../services/lb/netscaler.service';
import {NetscalerVirtualServiceComponent} from '../../objects';
import {environment} from '../../../../shared/common';


@Component({
    selector: 'app-netscaler-services-detail',
    templateUrl: './netscaler-services-detail.component.html',
    styleUrls: ['./netscaler-services-detail.component.css']
})
export class NetscalerServicesDetailComponent extends GenericObjectChartDetailComponent {
    service: Observable<NetscalerVirtualServiceComponent>;
    monitors;
    //
    // @Output() public navToggle: EventEmitter<any> = new EventEmitter<any>(false); // close side-nav before closing dialog for fix issue
    constructor(protected netscalerService: NetscalerService,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog, viewContainerRef);
    }

    ngOnInit(): void {
        this.title = 'Virtual Service detail';
        super.ngOnInit();
        this.service = this.netscalerService.getService(this.id, this.hostname);
        this.monitors = this.netscalerService.getMonitorsFromService(this.id, this.hostname);
        if (environment.DEBUG) {
            console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        }
    }

    public appMapping(ip: String, port: String): void {

    }


     public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/netscaler-virtualservice');
        }, environment.DELAY_MODAL);
    }
}
