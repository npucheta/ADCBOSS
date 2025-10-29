import {Component, Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {A10Service} from '../../../services/lb/a10.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSidenav} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {
    CertComponent,
    DeviceComponent,
    iRuleComponent,
    MonitorComponent,
    NodeComponent,
    PoolComponent,
    ProfileComponent,
    SNATPoolComponent,
    VirtualComponent
} from '../objects';
import {channels, environment, isForMe} from '../../../shared/common';
import {SharingDataService} from '../../../services/sharing-data.service';
import {ChannelService} from '../../../services/channel.service';
import {A10VirtualDetailComponent} from '../a10-objects-detail/a10-virtual-detail/a10-virtual-detail.component';
import {A10VirtualServiceDetailComponent} from '../a10-objects-detail/a10-virtual-service-detail/a10-virtual-service-detail.component';
import {A10ServiceGroupDetailComponent} from '../a10-objects-detail/a10-service-group-detail/a10-service-group-detail.component';
import {A10ServersDetailComponent} from '../a10-objects-detail/a10-servers-detail/a10-servers-detail.component';
import {DeviceDetailComponent} from '../device-detail/device-detail.component';



@Component({
  selector: 'app-a10-device-detail',
  templateUrl: './a10-device-detail.component.html',
  styleUrls: ['./a10-device-detail.component.css']
})
export class A10DeviceDetailComponent extends DeviceDetailComponent {
    @Input() device: DeviceComponent = null;
    @Input() nav: MatSidenav;
    virtuals: Observable<Component[]>;
    virtualservices: Observable<Component[]>;
    servicegroups: Observable<Component[]>;
    servers: Observable<Component[]>;
    monitors: Observable<Component[]>;
    snats: Observable<Component[]>;
    selectedVirtual: VirtualComponent;
    objectSelected: string;
    dialogRef: MatDialogRef<any>;
    options: object[];
    defaultOption = 'device';
    busy: Subscription;
    title = 'Device details';
     OPTIONS_DEVICE: object[] =
        [
            {id: 1, name: 'device', value: 'A10 Device details', status: 1},
            {id: 2, name: 'virtuals', value: 'A10 Virtual Servers', status: 1},
            {id: 3, name: 'virtualservices', value: 'A10 Virtual Services', status: 1},
            {id: 4, name: 'servicegroups', value: 'A10 Service Groups', status: 1},
            {id: 5, name: 'servers', value: 'A10 Servers', status: 1},
    //     {id: 6, name: 'templates', value: 'A10 Templates', status: 1},
    //      {id: 7, name: 'monitors', value: 'A10 Health Monitors', status: 1},
    //      {id: 8, name: 'snats', value: 'A10 IP Source NAT', status: 1},
    //      {id: 9, name: 'certs', value: 'A10 SSL Certs', status: 0}
        ];
    // sharing data service
    actionSubscription: Subscription;
    data: ChannelService;
    readonly SELF_CHANNEL = channels.CHANNEL_FOR_APP_A10_DEVICE_DETAIL; // this should be unique

    constructor(protected a10Service: A10Service,
                protected router: Router,
                protected dialog: MatDialog,
                protected viewContainerRef: ViewContainerRef,
                protected sharingDataService: SharingDataService) {
                super(router,dialog,viewContainerRef,sharingDataService);
    }

    public changeOption(option): void {
        if(option!=this.objectSelected)
            this.offset=0; //first offset for objects retrieval
        switch (option) {
            case('device'):
                this.title = 'Device details';
                // let confDump: boolean;
                // this.device = event.device;
                // this.devicesService.isConfigDumpCompleted(this.device.hostname).subscribe(x=>{confDump=x});
                break;
            case('virtuals'):
                this.title = 'Virtual Servers';
                if(this.comesfromsearch){
                    if(this.isIPaddressFlag)
                        this.virtuals = this.a10Service.searchVirtualServerFromHostnameByIP(this.device.hostname,this.offset,this.search);
                    else
                        this.virtuals = this.a10Service.searchVirtualServerFromHostnameByName(this.device.hostname,this.offset,this.search);
                }
                else
                    this.virtuals = this.a10Service.getVirtualServerFromHostname(this.device.hostname,this.offset);    
                this.busy = this.virtuals.subscribe();
                break;
            case('virtualservices'):
                this.title = 'Virtual Services';
                if(this.comesfromsearch)
                    this.virtualservices = this.a10Service.searchVirtualServicesFromHostname(this.device.hostname,this.offset,this.search);
                else
                    this.virtualservices = this.a10Service.getVirtualServicesFromHostname(this.device.hostname,this.offset);    
                this.busy = this.virtualservices.subscribe();
                break;
            case('servicegroups'):
                this.title = 'Service Groups';
                if(this.comesfromsearch)
                    this.servicegroups = this.a10Service.searchServicesGroupsFromHostname(this.device.hostname,this.offset,this.search);
                else
                    this.servicegroups = this.a10Service.getServicesGroupsFromHostname(this.device.hostname,this.offset);                  
                this.busy = this.servicegroups.subscribe();
                break;
            case('servers'):
                this.title = 'Servers';
                if(this.comesfromsearch)
                    this.servers = this.a10Service.searchServersFromHostname(this.device.hostname,this.offset,this.search);
                else
                    this.servers = this.a10Service.getServersFromHostname(this.device.hostname,this.offset);                  
                    
                this.busy = this.servers.subscribe();
                break;
            case('templates'):
                this.title = 'Templates';
              //    this.monitors = this.devicesService.getMonitorsFromHostname(this.device.hostname);
              //  this.busy = this.monitors.subscribe();
                break;
            case('monitors'):
                this.title = 'Health Monitors';
                //this.monitors = this.a10Service.getMonitorsFromHostname(this.device.hostname);
                //this.busy = this.monitors.subscribe();
                break;
            case('snats'):
                this.title = 'Source IP NATs';
               // this.snats = this.a10Service.getSNATsFromHostname(this.device.hostname);
               // this.busy = this.snats.subscribe();
                break;
            case('certs'):
                this.title = 'SSL Certs';
              //  this.certs = this.devicesService.getCertsFromHostname(this.device.hostname);
             //   this.busy = this.certs.subscribe();
                break;
            default:
                this.reset(true);
                break;
        }
        this.objectSelected = option;
    }

    public openDialog(option: string, id: string, hostname: string): void {
        // TODO resolve issue with dialog and link
        const config = new MatDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        let component;

        switch (option) {
            case('virtuals'):
                component = A10VirtualDetailComponent;
                break;
            case('virtualservices'):
                component = A10VirtualServiceDetailComponent;
                break;
            case('servicegroups'):
                component = A10ServiceGroupDetailComponent;
                break;
            case('servers'):
                component = A10ServersDetailComponent;
                break;
            case('templates'):
                break;
            case('monitors'):
                break;
            case('snats'):
                break
            default:
                break;
        }
        if (component) {
            this.dialogRef = this.dialog.open(component, config);
            this.dialogRef.componentInstance.id = id;
            this.dialogRef.componentInstance.hostname = hostname;
            this.dialogRef.afterClosed().subscribe(() => {
                this.dialogRef = null;
            });
        }
    }

    public navToggle() {
        this.nav.close().then();
    }
}
