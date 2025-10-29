import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GSLBService} from '../../../services/gslb/gslb.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {DatacenterComponent, ServerComponent} from '../GSLBobjects';
import {MatDialog, MatDialogRef} from '@angular/material';
import {channels} from '../../../shared/common';
import {SharingDataService} from '../../../services/sharing-data.service';
import {GenericObjectChartDetailComponent} from '../../lb/generic-object-chart-detail/generic-object-chart-detail.component';

@Component({
    selector: 'app-data-center-detail',
    templateUrl: './data-center-detail.component.html',
    styleUrls: ['./data-center-detail.component.css']
})
export class DataCenterDetailComponent extends GenericObjectChartDetailComponent {
    datacenter: Observable<DatacenterComponent>;
    servers: Observable<ServerComponent[]>;

    constructor(protected service: GSLBService,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public sharingDataService: SharingDataService,
                public viewContainerRef: ViewContainerRef) {
                super(route, router, dialog, viewContainerRef);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.datacenter = this.service.getDatacenter(this.id);
        this.servers = this.service.getServersFromDatacenter(this.id);
    }

    // TODO implement in future and move to utils and add close automatic
    public goSelf(): void {
        /*this.sharingDataService.setData({
            from: channels.CHANNEL_ALL,
            to: [channels.CHANNEL_FOR_APP_GSLB_OBJECTS],
            info: ['close-modal']
        });*/
        this.dialog.closeAll();
        setTimeout(() => {
            this.router.navigate(['/datacenter', this.id]).then();
        }, 50);
    }
}
