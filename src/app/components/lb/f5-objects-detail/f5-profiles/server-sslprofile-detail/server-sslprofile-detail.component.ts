import {Component} from '@angular/core';
import {ServerSSLProfileComponent} from '../../../objects';
import {ActivatedRoute, Router} from '@angular/router';
import {DevicesService} from '../../../../../services/lb/devices.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog} from '@angular/material';
import {GenericObjectDetailComponent} from '../../../generic-object-detail/generic-object-detail.component';
import {environment} from '../../../../../shared/common';

@Component({
    selector: 'app-server-sslprofile-detail',
    templateUrl: '../../../generic-object-detail/generic-object-detail.component.html',
    styleUrls: ['./server-sslprofile-detail.component.css']
})
export class ServerSSLProfileDetailComponent extends GenericObjectDetailComponent {
    constructor(public devicesService: DevicesService,
                public route: ActivatedRoute,
                public router: Router,
                public dialog: MatDialog) {
        super(route, router, dialog);
    }

    ngOnInit(): void {
        this.title = 'Server SSL profile detail';
        super.ngOnInit();
        this.component = this.devicesService.getServerSSLProfile(this.id, this.hostname);
    }

    // TODO implement in future and move to utils and add close automatic
    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/serversslprofile');
        }, environment.DELAY_MODAL);
    }
}
