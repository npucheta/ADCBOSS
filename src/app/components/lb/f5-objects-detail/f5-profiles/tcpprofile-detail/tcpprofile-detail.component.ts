import {Component} from '@angular/core';
import {TCPProfileComponent} from '../../../objects';
import {ActivatedRoute, Router} from '@angular/router';
import {DevicesService} from '../../../../../services/lb/devices.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog} from '@angular/material';
import {GenericObjectDetailComponent} from '../../../generic-object-detail/generic-object-detail.component';
import {SharingDataService} from '../../../../../services/sharing-data.service';
import {environment} from '../../../../../shared/common';

@Component({
    selector: 'app-tcpprofile-detail',
    templateUrl: '../../../generic-object-detail/generic-object-detail.component.html',
    styleUrls: ['./tcpprofile-detail.component.css']
})
export class TCPProfileDetailComponent extends GenericObjectDetailComponent {
    constructor(public devicesService: DevicesService,
                public route: ActivatedRoute,
                public router: Router,
                public sharingDataService: SharingDataService,
                public dialog: MatDialog) {
        super(route, router, dialog);
    }

    ngOnInit(): void {
        this.title = 'TCP profile detail';
        super.ngOnInit();
        this.component = this.devicesService.getTCPProfile(this.id, this.hostname);
    }

    // TODO implement in future and move to utils and add close automatic
    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/tcpprofile');
        }, environment.DELAY_MODAL);
    }
}
