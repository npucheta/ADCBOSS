import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {AWSService} from '../../../../services/lb/aws.service';
import {AppMapping, AWSListenerComponent} from '../../objects';
import {environment} from '../../../../shared/common';

@Component({
    selector: 'app-awslistenerv1-detail',
    templateUrl: '../../generic-object-chart-detail/generic-object-chart-detail.component.html',
    styleUrls: ['./awslistenerv1-detail.component.css']
})
export class AWSListenerv1DetailComponent extends GenericObjectChartDetailComponent {

    // @Output() public navToggle: EventEmitter<any> = new EventEmitter<any>(false); // close side-nav before closing dialog for fix issue
    constructor(protected awsService: AWSService,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog, viewContainerRef);
    }

    ngOnInit(): void {
        this.title = 'Listenerv1 detail';
        super.ngOnInit();
        this.component = this.awsService.getListenerv1(this.id, this.hostname);
        if (environment.DEBUG) {
            console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        }
    }

    public appMapping(element): void {
        const ip = encodeURIComponent(element.ListenerArn);
        const port = element.Port;
        console.log('mapping ' + ip + ' ' + port);

        this.awsService.appMappingIPPort(ip, port,this.hostname).subscribe(
            data => {
                let appMapping: AppMapping;
                appMapping = data;
                this.openChart(appMapping.virtuals, 'v');
            });
    }

    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/aws-listenerv1');
        }, environment.DELAY_MODAL);
    }
    
}
