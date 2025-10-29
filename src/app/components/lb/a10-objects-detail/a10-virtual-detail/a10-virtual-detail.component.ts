import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {A10Service} from '../../../../services/lb/a10.service';
import {
    AppMapping,
    NetscalerServiceGroupComponent,
    NetscalerVirtualComponent,
    NetscalerVirtualServiceComponent
} from '../../objects';
import {environment} from '../../../../shared/common';

@Component({
  selector: 'app-a10-virtual-detail',
  templateUrl: './a10-virtual-detail.component.html',
  styleUrls: ['./a10-virtual-detail.component.css']
})
export class A10VirtualDetailComponent extends GenericObjectChartDetailComponent {
    virtual: Observable<NetscalerVirtualComponent>;
    services: Observable<NetscalerVirtualServiceComponent>;
    servicegroups: Observable<NetscalerServiceGroupComponent>;

    // @Output() public navToggle: EventEmitter<any> = new EventEmitter<any>(false); // close side-nav before closing dialog for fix issue
    constructor(protected a10Service: A10Service,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog, viewContainerRef);
    }

    ngOnInit(): void {
        this.title = 'Virtual Server detail';
        super.ngOnInit();
        this.virtual = this.a10Service.getVirtualServer(this.id, this.hostname);
        this.services = this.a10Service.getVirtualServicesFromVirtual(this.id);
        //this.servicegroups = this.netscalerService.getServiceGroupsFromVirtual(this.id, this.hostname);
        if (environment.DEBUG) {
            console.log('ID ' + this.id + ' Hostname ' + this.hostname);
        }
    }


    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/a10-virtual');
        }, environment.DELAY_MODAL);
    }
}
