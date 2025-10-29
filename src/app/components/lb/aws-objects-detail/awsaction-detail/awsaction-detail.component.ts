import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {GenericObjectDetailComponent} from '../..//generic-object-detail/generic-object-detail.component';
import {AWSService} from '../../../../services/lb/aws.service';
import {AWSActionComponent} from '../../objects';
import {environment} from '../../../../shared/common';

@Component({
    selector: 'app-awsaction-detail',
    templateUrl: '../../generic-object-detail/generic-object-detail.component.html',
    styleUrls: ['./awsaction-detail.component.css']
})
export class AWSactionDetailComponent extends GenericObjectDetailComponent {

    // @Output() public navToggle: EventEmitter<any> = new EventEmitter<any>(false); // close side-nav before closing dialog for fix issue
    constructor(protected awsService: AWSService,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog);
    }

    ngOnInit(): void {
        this.title = 'Server detail';
        super.ngOnInit();
        this.component = this.awsService.getAction(this.id, this.hostname);
        if (environment.DEBUG) {
            console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        }
    }

   public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/aws-zone');
        }, environment.DELAY_MODAL);
    }
}
