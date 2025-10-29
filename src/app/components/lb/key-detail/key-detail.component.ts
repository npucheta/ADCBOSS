import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectDetailComponent} from '../generic-object-detail/generic-object-detail.component';
import {A10Service} from '../../../services/lb/a10.service';
import {DevicesService} from '../../../services/lb/devices.service';
import {
    AppMapping,
    NetscalerServiceGroupComponent,
    NetscalerVirtualComponent,
    NetscalerVirtualServiceComponent,
    LBComponent
} from '../objects';
import {environment} from '../../../shared/common';

@Component({
  selector: 'app-key-detail',
  templateUrl: '../generic-object-detail/generic-object-detail.component.html',
  styleUrls: ['./key-detail.component.css']
})
export class KeyDetailComponent extends GenericObjectDetailComponent {

    constructor(protected a10Service: A10Service,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public devicesService: DevicesService) {
        super(route, router, dialog);
    }

    ngOnInit(): void {
        this.title = 'Certificate detail';
        super.ngOnInit();
        this.component = this.devicesService.getKey(this.id, this.hostname);
        if (environment.DEBUG) {
            console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        }
    }
    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/key');
        }, environment.DELAY_MODAL);
    }
}
