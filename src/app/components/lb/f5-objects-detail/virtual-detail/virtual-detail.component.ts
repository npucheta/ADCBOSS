import {Component, Input, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DevicesService} from '../../../../services/lb/devices.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {GenericObjectChartDetailComponent} from '../../generic-object-chart-detail/generic-object-chart-detail.component';
import {
    AppMapping,
    ClientSSLProfileComponent,
    FastL4ProfileComponent,
    FTPProfileComponent,
    HTTPClassComponent,
    HTTPProfileComponent,
    OneConnectProfileComponent,
    ServerSSLProfileComponent,
    StreamProfileComponent,
    TCPProfileComponent,
    UDPProfileComponent,
    VirtualComponent
} from '../../objects';
import {environment} from '../../../../shared/common';

@Component({
    selector: 'app-virtual',
    templateUrl: './virtual-detail.component.html',
    styleUrls: ['./virtual-detail.component.css']
})
export class VirtualDetailComponent extends GenericObjectChartDetailComponent {
    virtual: Observable<VirtualComponent>;
    httpprofile: Observable<HTTPProfileComponent>;
    tcpprofile: Observable<TCPProfileComponent>;
    udpprofile: Observable<UDPProfileComponent>;
    fastl4profile: Observable<FastL4ProfileComponent>;
    clientsslprofile: Observable<ClientSSLProfileComponent>;
    serversslprofile: Observable<ServerSSLProfileComponent>;
    oneconnectprofile: Observable<OneConnectProfileComponent>;
    streamprofile: Observable<StreamProfileComponent>;
    ftpprofile: Observable<FTPProfileComponent>;
    httpclass: Observable<HTTPClassComponent>;
    dialogRef: MatDialogRef<any>;


    constructor(protected devicesService: DevicesService,
                protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                // public sharingDataService: SharingDataService,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog, viewContainerRef);
    }

    public ngOnInit(): void {
        this.title = 'Virtual detail';
        super.ngOnInit();

        this.virtual = this.devicesService.getVirtual(this.id, this.hostname);
        this.httpprofile = this.devicesService.getHTTPProfileFromVirtual(this.id, this.hostname);
        this.tcpprofile = this.devicesService.getTCPProfileFromVirtual(this.id, this.hostname);
        this.udpprofile = this.devicesService.getUDPProfileFromVirtual(this.id, this.hostname);
        this.fastl4profile = this.devicesService.getFastL4ProfileFromVirtual(this.id, this.hostname);
        this.clientsslprofile = this.devicesService.getClientSSLProfileFromVirtual(this.id, this.hostname);
        this.serversslprofile = this.devicesService.getServerSSLProfileFromVirtual(this.id, this.hostname);
        this.oneconnectprofile = this.devicesService.getOneConnectProfileFromVirtual(this.id, this.hostname);
        this.streamprofile = this.devicesService.getStreamProfileFromVirtual(this.id, this.hostname);
        this.ftpprofile = this.devicesService.getFTPProfileFromVirtual(this.id, this.hostname);
        this.httpclass = this.devicesService.getHTTPClassFromVirtual(this.id, this.hostname);
    }

    public appMapping(ip: string, port: String): void {
        if (environment.DEBUG) {
            console.log('mapping ' + ip + ' ' + port);
        }

        this.devicesService.appMappingIPPort(ip, port,this.hostname).subscribe(
            data => {
                let appMapping: AppMapping;
                appMapping = data;
                this.openChart(appMapping.virtuals, 'v');
            });
    }

    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/virtual');
        }, environment.DELAY_MODAL);
    }
}
