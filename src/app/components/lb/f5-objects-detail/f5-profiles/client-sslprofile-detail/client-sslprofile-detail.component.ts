import {Component} from '@angular/core';
import {ClientSSLProfileComponent} from '../../../objects';
import {ActivatedRoute, Router} from '@angular/router';
import {DevicesService} from '../../../../../services/lb/devices.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog} from '@angular/material';
import {GenericObjectDetailComponent} from '../../../generic-object-detail/generic-object-detail.component';
import {environment} from '../../../../../shared/common';

@Component({
    selector: 'app-client-sslprofile-detail',
    templateUrl: '../../../generic-object-detail/generic-object-detail.component.html',
    styleUrls: ['./client-sslprofile-detail.component.css']
})
export class ClientSSLProfileDetailComponent extends GenericObjectDetailComponent {
    constructor(public devicesService: DevicesService,
                public route: ActivatedRoute,
                public router: Router,
                public dialog: MatDialog) {
        super(route, router, dialog);
    }

    ngOnInit(): void {
        this.title = 'Client SSL profile detail';
        super.ngOnInit();
        this.component = this.devicesService.getClientSSLProfile(this.id, this.hostname);
    }

    // TODO implement in future and move to utils and add close automatic
    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/clientsslprofile');
        }, environment.DELAY_MODAL);
    }
}
