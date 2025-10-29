import {Component, OnInit, Input, ViewContainerRef, OnDestroy} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSidenav} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {NetscalerService} from '../../../services/lb/netscaler.service';
import {NetscalerVirtualDetailComponent} from '../netscaler-objects-detail/netscaler-virtual-detail/netscaler-virtual-detail.component';
import {NetscalerCSVirtualDetailComponent} from '../netscaler-objects-detail/netscaler-csvirtual-detail/netscaler-csvirtual-detail.component';
import {NetscalerCRVirtualDetailComponent} from '../netscaler-objects-detail/netscaler-crvirtual-detail/netscaler-crvirtual-detail.component';
import {NetscalerServicegroupsDetailComponent} from '../netscaler-objects-detail/netscaler-servicegroups-detail/netscaler-servicegroups-detail.component';
import {NetscalerServicesDetailComponent} from '../netscaler-objects-detail/netscaler-services-detail/netscaler-services-detail.component';
import {NetscalerPersistenceGroupsDetailComponent} from '../netscaler-objects-detail/netscaler-persistence-groups-detail/netscaler-persistence-groups-detail.component';
import {NetscalerServerDetailComponent} from '../netscaler-objects-detail/netscaler-server-detail/netscaler-server-detail.component';
import {NetscalerMonitorDetailComponent} from '../netscaler-objects-detail/netscaler-monitor-detail/netscaler-monitor-detail.component';
import {NetscalerProfileDetailComponent} from '../netscaler-objects-detail/netscaler-profiles/netscaler-profile-detail/netscaler-profile-detail.component';
import {NetscalerCRPolicyDetailComponent} from '../netscaler-objects-detail/netscaler-crpolicy-detail/netscaler-crpolicy-detail.component';
import {NetscalerCSActionDetailComponent} from '../netscaler-objects-detail/netscaler-csaction-detail/netscaler-csaction-detail.component';
import {NetscalerCSPolicyDetailComponent} from '../netscaler-objects-detail/netscaler-cspolicy-detail/netscaler-cspolicy-detail.component';
import {DeviceDetailComponent} from '../device-detail/device-detail.component';
import {SharingDataService} from '../../../services/sharing-data.service';
import {DeviceComponent} from '../objects';



@Component({
    selector: 'app-netscaler-device',
    templateUrl: './netscaler-device-detail.component.html',
    styleUrls: ['./netscaler-device-detail.component.css']
})
export class NetscalerDeviceDetailComponent extends DeviceDetailComponent {
    @Input()
    device: DeviceComponent = null;
    @Input() nav: MatSidenav;
    virtuals: Observable<NetscalerVirtualDetailComponent[]>;
    csvirtuals: Observable<NetscalerCSVirtualDetailComponent[]>;
    crvirtuals: Observable<NetscalerCRVirtualDetailComponent[]>;
    crpolicies: Observable<NetscalerCRPolicyDetailComponent[]>;
    csactions: Observable<NetscalerCSActionDetailComponent[]>;
    cspolicies: Observable<NetscalerCSPolicyDetailComponent[]>;
    servicegroups: Observable<NetscalerServicegroupsDetailComponent[]>;
    services: Observable<NetscalerServicesDetailComponent[]>;
    persistencegroups: Observable<NetscalerPersistenceGroupsDetailComponent[]>;
    servers: Observable<NetscalerServerDetailComponent[]>;
    monitors: Observable<NetscalerMonitorDetailComponent[]>;
   
   // selectedVirtual: VirtualComponent;
    objectSelected: string;
    dialogRef: MatDialogRef<any>;
    options: object[];
    defaultOption = 'device';
    busy: Subscription;

// TODO convert to service
     OPTIONS_DEVICE: object[] =
    [
        {id: 1, name: 'device', value: 'Netscaler device details', status: 1},
        {id: 2, name: 'virtuals', value: 'Netscaler Virtuals', status: 1},
        {id: 4, name: 'servicegroups', value: 'Netscaler Service Groups', status: 1},
        {id: 5, name: 'services', value: 'Netscaler Services', status: 1},
        {id: 6, name: 'persistencegroups', value: 'Netscaler Persistence Groups', status: 1},
        {id: 7, name: 'csvirtuals', value: 'Netscaler Context Switching Virtuals', status: 1},
        {id: 8, name: 'csactions', value: 'Netscaler Context Switching Actions', status: 1},
        {id: 9, name: 'cspolicies', value: 'Netscaler Context Switching Policies', status: 1},
        {id: 10, name: 'crvirtuals', value: 'Netscaler Cache Redirection Virtuals', status: 1},
        {id: 11, name: 'crpolicies', value: 'Netscaler Cache Redirection Policies', status: 1},
        {id: 12, name: 'profiles', value: 'Netscaler Profiles', status: 1},
        {id: 13, name: 'nodes', value: 'Netscaler Servers', status: 1},
        {id: 13, name: 'monitors', value: 'Netscaler Monitors', status: 1}
    ];
    constructor(protected netscalerService: NetscalerService,
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
                this.reset(true);
                // let confDump: boolean;
                // this.device = event.device;
                // this.devicesService.isConfigDumpCompleted(this.device.hostname).subscribe(x=>{confDump=x});
                break;
            case('virtuals'):
                 if(this.comesfromsearch){
                    if(this.isIPaddressFlag)
                     this.virtuals = this.netscalerService.searchVirtualsByIP(this.device.hostname,this.offset,this.search);   
                    else
                     this.virtuals = this.netscalerService.searchVirtualsByName(this.device.hostname,this.offset,this.search);   
                 }
                 else
                    this.virtuals = this.netscalerService.getVirtuals(this.device.hostname,this.offset);
                this.busy = this.virtuals.subscribe();
                break;
            case('crvirtuals'):
                if(this.comesfromsearch)
                    this.crvirtuals = this.netscalerService.searchCRVirtuals(this.device.hostname,this.offset,this.search);  
                else
                    this.crvirtuals = this.netscalerService.getCRVirtuals(this.device.hostname,this.offset);
                this.busy = this.crvirtuals.subscribe();
                break;
            case('crpolicies'):
                if(this.comesfromsearch)
                    this.crpolicies = this.netscalerService.searchCRPolicies(this.device.hostname,this.offset,this.search);  
                else
                    this.crpolicies = this.netscalerService.getCRPolicies(this.device.hostname,this.offset);

                this.busy = this.crpolicies.subscribe();
                break;         
            case('csvirtuals'):
                if(this.comesfromsearch)
                    this.csvirtuals = this.netscalerService.searchCSVirtuals(this.device.hostname,this.offset,this.search);  
                else
                    this.csvirtuals = this.netscalerService.getCSVirtuals(this.device.hostname,this.offset);
                    
                this.busy = this.csvirtuals.subscribe();
                break;
            case('csactions'):
                if(this.comesfromsearch)
                    this.csactions = this.netscalerService.searchCSActions(this.device.hostname,this.offset,this.search);
                else
                    this.csactions = this.netscalerService.getCSActions(this.device.hostname,this.offset);
                    
                this.busy = this.csactions.subscribe();
                break;
            case('cspolicies'):
                if(this.comesfromsearch)
                    this.cspolicies = this.netscalerService.searchCSPolicies(this.device.hostname,this.offset,this.search);
                 else
                    this.cspolicies = this.netscalerService.getCSPolicies(this.device.hostname,this.offset);                      
                this.busy = this.cspolicies.subscribe();
                break;
            case('servicegroups'):
                if(this.comesfromsearch)
                    this.servicegroups = this.netscalerService.searchServicegroups(this.device.hostname,this.offset,this.search);
                else
                     this.servicegroups = this.netscalerService.getServicegroups(this.device.hostname,this.offset);
                this.busy = this.servicegroups.subscribe();
                break;
            case('services'):
                if(this.comesfromsearch)
                    this.services = this.netscalerService.searchServices(this.device.hostname,this.offset,this.search);
                else
                    this.services = this.netscalerService.getServices(this.device.hostname,this.offset);
                this.busy = this.services.subscribe();
                break;
            case('persistencegroups'):
                if(this.comesfromsearch)
                    this.persistencegroups = this.netscalerService.searchPersistencegroups(this.device.hostname,this.offset,this.search);
                else
                    this.persistencegroups = this.netscalerService.getPersistencegroups(this.device.hostname,this.offset);
                this.busy = this.persistencegroups.subscribe();
                break;
            case('profiles'):
                break;
            case('monitors'):
                if(this.comesfromsearch)
                    this.monitors = this.netscalerService.searchMonitors(this.device.hostname,this.offset,this.search);
                else
                    this.monitors = this.netscalerService.getMonitors(this.device.hostname,this.offset);      
                this.busy = this.monitors.subscribe();
                break;
            case('nodes'):
                if(this.comesfromsearch)
                    this.servers = this.netscalerService.searchServers(this.device.hostname,this.offset,this.search);
                else
                    this.servers = this.netscalerService.getServers(this.device.hostname,this.offset);
                this.busy = this.servers.subscribe();
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
        switch (option) {
            case('crvirtuals'):
                this.dialogRef = this.dialog.open(NetscalerCRVirtualDetailComponent, config);
                break;
            case('crpolicies'):
                this.dialogRef = this.dialog.open(NetscalerCRPolicyDetailComponent, config);
                break;
            case('csvirtuals'):
                this.dialogRef = this.dialog.open(NetscalerCSVirtualDetailComponent, config);
                break;
            case('csactions'):
                this.dialogRef = this.dialog.open(NetscalerCSActionDetailComponent, config);
                break;
            case('cspolicies'):
                this.dialogRef = this.dialog.open(NetscalerCSPolicyDetailComponent, config);
                break;
            case('virtuals'):
                this.dialogRef = this.dialog.open(NetscalerVirtualDetailComponent, config);
                break;
            case('servicegroups'):
                this.dialogRef = this.dialog.open(NetscalerServicegroupsDetailComponent, config);
                break;
            case('services'):
                this.dialogRef = this.dialog.open(NetscalerServicesDetailComponent, config);
                break;
            case('persistencegroups'):
                this.dialogRef = this.dialog.open(NetscalerPersistenceGroupsDetailComponent, config);
                break;
            case('profiles'):
                this.dialogRef = this.dialog.open(NetscalerProfileDetailComponent, config);
                break;
             case('nodes'):
                 this.dialogRef = this.dialog.open(NetscalerServerDetailComponent, config);
                break;   
             case('monitors'):
                 this.dialogRef = this.dialog.open(NetscalerMonitorDetailComponent, config);
                break;         
            default:
                break;
        }
        if(this.dialogRef)
            {
                this.dialogRef.componentInstance.id = id;
                this.dialogRef.componentInstance.hostname = hostname;
            }
        this.dialogRef.afterClosed().subscribe(() => {
            this.dialogRef = null;
        });
    }
    
    public navToggle() {
        this.nav.close().then();
    }

}
