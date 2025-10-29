import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {AWSService} from '../../../../services/lb/aws.service';
import {AWSTargetGroupComponent} from '../../objects';
import {environment} from '../../../../shared/common';
import {
    AppMapping,
    LBComponent
} from '../../objects';
@Component({
    selector: 'app-awstargetgroup-detail',
    templateUrl: './awstargetgroup-detail.component.html',
    styleUrls: ['./awstargetgroup-detail.component.css']
})
export class AWStargetgroupDetailComponent extends GenericObjectChartDetailComponent {
    targetgroup: Observable<AWSTargetGroupComponent>;
    targets: Observable<AWSTargetGroupComponent>;


    // @Output() public navToggle: EventEmitter<any> = new EventEmitter<any>(false); // close side-nav before closing dialog for fix issue
    constructor(protected awsService: AWSService,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog, viewContainerRef);
    }

    ngOnInit(): void {
        this.title = 'Server detail';
        super.ngOnInit();
        this.targetgroup = this.awsService.getTargetGroup(this.id, this.hostname);
        this.targets = this.awsService.getTargetsFromTargetGroup(this.id, this.hostname);
        this.component = this.targetgroup;
        if (environment.DEBUG) {
            console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        }
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
            super.goSelf('/aws-targetgroup');
        }, environment.DELAY_MODAL);
    }
}
