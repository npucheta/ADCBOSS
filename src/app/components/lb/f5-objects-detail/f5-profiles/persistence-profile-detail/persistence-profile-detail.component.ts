import {Component} from '@angular/core';
import {PersistenceProfileComponent} from '../../../objects';
import {ActivatedRoute, Router} from '@angular/router';
import {DevicesService} from '../../../../../services/lb/devices.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog} from '@angular/material';
import {GenericObjectDetailComponent} from '../../../generic-object-detail/generic-object-detail.component';
import {environment} from '../../../../../shared/common';
import {SharingDataService} from '../../../../../services/sharing-data.service';

@Component({
    selector: 'app-persistence-profile-detail',
    templateUrl: '../../../generic-object-detail/generic-object-detail.component.html',
    styleUrls: ['./persistence-profile-detail.component.css']
})
export class PersistenceProfileDetailComponent extends GenericObjectDetailComponent {
    constructor(public devicesService: DevicesService,
                public route: ActivatedRoute,
                public router: Router,
                public sharingDataService: SharingDataService,
                public dialog: MatDialog) {
        super(route, router, dialog);
    }

    ngOnInit(): void {
        this.title = 'Persistence profile detail';
        super.ngOnInit();
        this.component = this.devicesService.getPersistenceProfile(this.id, this.hostname);
    }

    // TODO implement in future and move to utils and add close automatic
    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/persistenceprofile');
        }, environment.DELAY_MODAL);
    }
}
