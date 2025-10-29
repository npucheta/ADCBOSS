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
    selector: 'app-awslistener-detail',
    templateUrl: './awslistener-detail.component.html', // HTML template inheritance not supported, so we import it
    styleUrls: ['./awslistener-detail.component.css']
})
export class AWSListenerDetailComponent extends GenericObjectChartDetailComponent {
    listener: Observable<AWSListenerComponent>;
    targetgroups: Observable<AWSListenerComponent>;

    constructor(protected awsService: AWSService,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog, viewContainerRef);
    }

    ngOnInit(): void {
        this.title = 'Listener detail';
        super.ngOnInit();
        this.listener = this.awsService.getListener(this.id, this.hostname);
        this.targetgroups = this.awsService.getTargetGroupsFromListener(this.id, this.hostname);
        this.component = this.listener;
        if (environment.DEBUG) {
            console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        }
    }

    /*openSideNav() {
     this.navToggle.emit(true);
     }*/

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
            super.goSelf('/aws-listener');
        }, environment.DELAY_MODAL);
    }
}
