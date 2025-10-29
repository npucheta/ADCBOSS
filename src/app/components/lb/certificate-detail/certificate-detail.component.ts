import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectDetailComponent} from '../generic-object-detail/generic-object-detail.component';
import {A10Service} from '../../../services/lb/a10.service';
import {DevicesService} from '../../../services/lb/devices.service';
import {LoadBalancerService}  from '../../../services/lb/load-balancer.service';
import {DeviceFactoryService}   from '../../../services/device-factory.service';
import{
    AppMapping,
    NetscalerServiceGroupComponent,
    NetscalerVirtualComponent,
    NetscalerVirtualServiceComponent,
    LBComponent
} from '../objects';
import {environment} from '../../../shared/common';

@Component({
  selector: 'app-certificate-detail',
  templateUrl: '../generic-object-detail/generic-object-detail.component.html',
  styleUrls: ['./certificate-detail.component.css']
})
export class CertificateDetailComponent extends GenericObjectDetailComponent {
    deviceservice: LoadBalancerService;


    // @Output() public navToggle: EventEmitter<any> = new EventEmitter<any>(false); // close side-nav before closing dialog for fix issue
    constructor(protected a10Service: A10Service,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public deviceFactoryService: DeviceFactoryService) {
        super(route, router, dialog);
    }

    ngOnInit(): void {
        this.title = 'Certificate detail';
        super.ngOnInit();
        this.deviceservice = this.deviceFactoryService.returnSpecificServiceFromVendorOnly(this.vendor);
        this.component = this.deviceservice.getCertificate(this.id, this.hostname);

        //this.certificate = this.devicesService.getCertificate(this.id, this.hostname);
        if (environment.DEBUG) {
            console.log('ID Cert ' + this.id + ' Hostname ' + this.hostname + ' Vendor '+this.vendor);
        }
    }
    public goSelf(): void {
        setTimeout(() => {
            this.goSelfLocal('/certificate');
        }, environment.DELAY_MODAL);
    }

    public goSelfLocal(route: string): void { //Certificate object needs vendor input for routing

        this.dialog.closeAll();
        if (this.dialogRef) {
            this.dialogRef.close(this.dialog);
        }
        if (this.id && this.hostname && this.vendor) {
            this.router.navigate([route, this.id, this.hostname, this.vendor]).then(() => {
                if (environment.DEBUG) {
                    console.log('id ==> ', this.id);
                    console.log('hostname ==> ', this.hostname);
                    console.log('vendor ==> ', this.vendor);
                    console.log('route ==> ', route);
                }
            });
        }
        else
        if (this.id && this.hostname) {
            this.router.navigate([route, this.id, this.hostname]).then(() => {
                if (environment.DEBUG) {
                    console.log('id ==> ', this.id);
                    console.log('hostname ==> ', this.hostname);
                    console.log('route ==> ', route);
                }
            });
        }

    }
}
