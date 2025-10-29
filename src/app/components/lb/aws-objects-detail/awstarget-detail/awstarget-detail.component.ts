import {Component, OnInit, Input, OnDestroy, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DevicesService} from '../../../../services/lb/devices.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {CanvasDialogComponent} from '../../../../shared/canvas-dialog/canvas-dialog.component';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {AWSService} from '../../../../services/lb/aws.service';
import {
    AWSTargetComponent,
    AppMapping
} from '../../objects';
import {environment} from '../../../../shared/common';

@Component({
    selector: 'app-awstarget-detail',
    templateUrl: '../../generic-object-chart-detail/generic-object-chart-detail.component.html',
    styleUrls: ['./awstarget-detail.component.css']
})
export class AWStargetDetailComponent extends GenericObjectChartDetailComponent {
    constructor(protected awsService: AWSService,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog, viewContainerRef);
    }

    ngOnInit(): void {
        this.miniTitle = 'Target details';
        super.ngOnInit();
        console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        this.component = this.awsService.getTarget(this.id, this.hostname);
    }



    public appMapping(): void {
        this.awsService.appMappingIPPort(this.id,'ByName',this.hostname).subscribe(
            data => {
                let appMapping: AppMapping;
                appMapping = data;
                this.openChart(appMapping.virtuals, 'v');
            });
    }


    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/aws-target');
        }, environment.DELAY_MODAL);
    }
}
