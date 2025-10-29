import {Component} from '@angular/core';
import {HTTPProfileComponent} from '../../../objects';
import {ActivatedRoute, Router} from '@angular/router';
import {DevicesService} from '../../../../../services/lb/devices.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog} from '@angular/material';
import {GenericObjectDetailComponent} from '../../../generic-object-detail/generic-object-detail.component';
import {environment} from '../../../../../shared/common';

@Component({
    selector: 'app-httpprofile-detail',
    templateUrl: '../../../generic-object-detail/generic-object-detail.component.html',
    styleUrls: ['./httpprofile-detail.component.css']
})
export class HTTPProfileDetailComponent extends GenericObjectDetailComponent {
    constructor(protected devicesService: DevicesService,
                protected route: ActivatedRoute,
                protected router: Router,
                protected dialog: MatDialog) {
        super(route, router, dialog);
    }

    ngOnInit(): void {
        this.title = 'HTTP profile detail';
        super.ngOnInit();
        this.component = this.devicesService.getHTTPProfile(this.id, this.hostname);
    }

    // TODO implement in future and move to utils and add close automatic
    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/httpprofile');
        }, environment.DELAY_MODAL);
    }
}
