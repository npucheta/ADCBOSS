import {Component} from '@angular/core';
import {UDPProfileComponent} from '../../../objects';
import {ActivatedRoute, Router} from '@angular/router';
import {DevicesService} from '../../../../../services/lb/devices.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog} from '@angular/material';
import {GenericObjectDetailComponent} from '../../../generic-object-detail/generic-object-detail.component';
import {environment} from '../../../../../shared/common';

@Component({
    selector: 'app-udpprofile-detail',
    templateUrl: '../../../generic-object-detail/generic-object-detail.component.html',
    styleUrls: ['./udpprofile-detail.component.css']
})
export class UDPProfileDetailComponent extends GenericObjectDetailComponent {

    constructor(public devicesService: DevicesService,
                public route: ActivatedRoute,
                public router: Router,
                public dialog: MatDialog) {
        super(route, router, dialog);
    }

    ngOnInit(): void {
        this.title = 'UDP profile detail';
        super.ngOnInit();
        this.component = this.devicesService.getUDPProfile(this.id, this.hostname);
    }

    // TODO implement in future and move to utils and add close automatic
    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/udpprofile');
        }, environment.DELAY_MODAL);
    }
}
