import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../../generic-object-chart-detail/generic-object-chart-detail.component';
import {NetscalerService} from '../../../../../services/lb/netscaler.service';
import {NetscalerProfileComponent} from '../../../objects';
import {environment} from '../../../../../shared/common';


@Component({
    selector: 'app-netscaler-tcpprofile-detail',
    templateUrl: '../../../generic-object-detail/generic-object-detail.component.html', // HTML template inheritance not supported, so we import it
    styleUrls: ['./netscaler-tcpprofile-detail.component.css']
})
export class NetscalerTCPProfileDetailComponent extends GenericObjectChartDetailComponent {
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
        this.component = this.netscalerService.getTCPProfile(this.id, this.hostname);
        if (environment.DEBUG) {
            console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        }
    }

    public appMapping(ip: String, port: String): void {

    }


    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/netscaler-tcpprofile');
        }, environment.DELAY_MODAL);
    }
}
