import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {RadwareService} from '../../../../services/lb/radware.service';
import {AppMapping, NetscalerVirtualComponent, NetscalerVirtualServiceComponent} from '../../objects';
import {environment} from '../../../../shared/common';
import {GenericObjectDetailComponent} from '../../generic-object-detail/generic-object-detail.component';


@Component({
    selector: 'app-radware-virtual-detail',
    templateUrl: './radware-virtual-detail.component.html',
    styleUrls: ['./radware-virtual-detail.component.css']
})
export class RadwareVirtualDetailComponent extends GenericObjectDetailComponent {
    virtual: Observable<NetscalerVirtualComponent>;
    services: Observable<NetscalerVirtualServiceComponent>;

    // @Output() public navToggle: EventEmitter<any> = new EventEmitter<any>(false); // close side-nav before closing dialog for fix issue
    constructor(protected radwareService: RadwareService,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.title = 'Virtual detail';
        this.virtual = this.radwareService.getVirtual(this.id, this.hostname);
        this.services = this.radwareService.getVirtualServicesFromVirtual(this.id, this.hostname);
        if (environment.DEBUG) {
            console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        }
    }
    
     public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/radware-virtual');
        }, environment.DELAY_MODAL);
    }
}
