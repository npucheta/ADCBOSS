import {Component, Input, ViewContainerRef} from '@angular/core';
import {MonitorComponent} from '../../objects';
import {ActivatedRoute, Router} from '@angular/router';
import {DevicesService} from '../../../../services/lb/devices.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog} from '@angular/material';
import {GenericObjectDetailComponent} from '../../generic-object-detail/generic-object-detail.component';
import {environment} from '../../../../shared/common';

@Component({
    selector: 'app-monitor-detail',
    templateUrl: '../../generic-object-detail/generic-object-detail.component.html',
    styleUrls: ['./monitor-detail.component.css']
})
export class MonitorDetailComponent extends GenericObjectDetailComponent {
    constructor(public devicesService: DevicesService,
                public route: ActivatedRoute,
                public router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog);
    }

    ngOnInit(): void {
        this.title = 'Monitor detail';
        super.ngOnInit();
        this.component = this.devicesService.getMonitor(this.id, this.hostname);
    }

    // TODO implement in future and move to utils and add close automatic
    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/monitor');
        }, environment.DELAY_MODAL);
    }
}
