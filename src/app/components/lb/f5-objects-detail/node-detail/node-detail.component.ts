import {Component, ViewContainerRef} from '@angular/core';
import {AppMapping, NodeComponent} from '../../objects';
import {ActivatedRoute, Router} from '@angular/router';
import {DevicesService} from '../../../../services/lb/devices.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {environment} from '../../../../shared/common';

@Component({
    selector: 'app-node-detail',
    templateUrl: '../../generic-object-chart-detail/generic-object-chart-detail.component.html',
    styleUrls: ['./node-detail.component.css']
})

export class NodeDetailComponent extends GenericObjectChartDetailComponent {
    constructor(protected devicesService: DevicesService,
                protected route: ActivatedRoute,
                protected router: Router,
                protected dialog: MatDialog,
                protected viewContainerRef: ViewContainerRef) {
        super(route, router, dialog, viewContainerRef);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.title = 'Node detail';
        this.component = this.devicesService.getNode(this.id, this.hostname);
    }

    public appMapping(): void {
        this.devicesService.appMappingIPPort(this.id,'ByName',this.hostname).subscribe( 
                data => {
                let appMapping: AppMapping;
                appMapping = data;
                console.log(appMapping);
                this.openChart(appMapping.virtuals, 'v');
            });
    }

    // TODO implement in future and move to utils and add close automatic
    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/node');
        }, environment.DELAY_MODAL);
    }
}
