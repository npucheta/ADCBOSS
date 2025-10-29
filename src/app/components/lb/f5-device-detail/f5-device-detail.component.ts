import {Component, Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {DevicesService} from '../../../services/lb/devices.service';
import {VirtualDetailComponent} from '../f5-objects-detail/virtual-detail/virtual-detail.component';
import {MonitorDetailComponent} from '../f5-objects-detail/monitor-detail/monitor-detail.component';
import {PoolDetailComponent} from '../f5-objects-detail/pool-detail/pool-detail.component';
import {NodeDetailComponent} from '../f5-objects-detail/node-detail/node-detail.component';
import {iRuleDetailComponent} from '../f5-objects-detail/i-rule-detail/i-rule-detail.component';
import {Subscription} from 'rxjs/Subscription';
import {CertificateDetailComponent} from '../../../components/lb/certificate-detail/certificate-detail.component';
import {DeviceDetailComponent} from '../device-detail/device-detail.component';
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
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSidenav} from '@angular/material';
import {SNATPoolDetailComponent} from '../f5-objects-detail/snatpool-detail/snatpool-detail.component';


@Component({
    selector: 'app-device',
    templateUrl: './f5-device-detail.component.html',
    styleUrls: ['./f5-device-detail.component.css']
})
export class F5DeviceDetailComponent extends DeviceDetailComponent {
    @Input() device: DeviceComponent = null;
    @Input() nav: MatSidenav;
    virtuals: Observable<VirtualComponent[]>;
    profiles: Observable<ProfileComponent[]>;
    irules: Observable<iRuleComponent[]>;
    pools: Observable<PoolComponent[]>;
    nodes: Observable<NodeComponent[]>;
    monitors: Observable<MonitorComponent[]>;
    snatpools: Observable<SNATPoolComponent[]>;
    certificates: Observable<CertComponent[]>;
    selectedVirtual: VirtualComponent;
    dialogRef: MatDialogRef<any>;
    title = 'Device details';


    // TODO convert to service
    OPTIONS_DEVICE: object[] =
    [
        {id: 1, name: 'device', value: 'F5 Device details', status: 1},
        {id: 2, name: 'virtuals', value: 'LTM Virtuals', status: 1},
        {id: 3, name: 'profiles', value: 'LTM Profiles', status: 1},
        {id: 4, name: 'iRules', value: 'LTM iRules', status: 1},
        {id: 5, name: 'pools', value: 'LTM Pools', status: 1},
        {id: 6, name: 'nodes', value: 'LTM Nodes', status: 1},
        {id: 7, name: 'monitors', value: 'LTM Monitors', status: 1},
        {id: 8, name: 'snatPools', value: 'LTM SNATPools', status: 1},
        {id: 9, name: 'certificates', value: 'LTM Certificates', status: 1}
    ];

    readonly SELF_CHANNEL = channels.CHANNEL_FOR_APP_F5_DEVICE_DETAIL; // this should be unique

    constructor(protected devicesService: DevicesService,
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
                       this.virtuals = this.devicesService.SearchVSFromHostnameByIP(this.device.hostname,this.offset,this.search);
                    else
                       this.virtuals = this.devicesService.SearchVSFromHostnameByName(this.device.hostname,this.offset,this.search);
                }
                else
                    this.virtuals = this.devicesService.getVSFromHostname(this.device.hostname,this.offset);
                
                this.busy = this.virtuals.subscribe();
                break;
            case('profiles'):
                this.title = 'Profiles';
                break;
            case('iRules'):
                this.title = 'iRules';
                if(this.comesfromsearch)
                    this.irules = this.devicesService.searchiRulesFromHostname(this.device.hostname,this.offset,this.search);
                else
                    this.irules = this.devicesService.getiRulesFromHostname(this.device.hostname,this.offset);
                this.busy = this.irules.subscribe();
                break;
            case('pools'):
                this.title = 'Pools';
                if(this.comesfromsearch)
                    this.pools = this.devicesService.searchPoolsFromHostname(this.device.hostname,this.offset,this.search);
                else
                    this.pools = this.devicesService.getPoolsFromHostname(this.device.hostname,this.offset);
                this.busy = this.pools.subscribe();
                break;
            case('nodes'):
                this.title = 'Nodes';
                if(this.comesfromsearch)
                     this.nodes = this.devicesService.searchNodesFromHostname(this.device.hostname,this.offset,this.search);   
                else
                     this.nodes = this.devicesService.getNodesFromHostname(this.device.hostname,this.offset);
                this.busy = this.nodes.subscribe();
                break;
            case('monitors'):
                this.title = 'Monitors';
                if(this.comesfromsearch)
                    this.monitors = this.devicesService.searchMonitorsFromHostname(this.device.hostname,this.offset,this.search);   
                else
                    this.monitors = this.devicesService.getMonitorsFromHostname(this.device.hostname,this.offset);
                this.busy = this.monitors.subscribe();
                break;
            case('snatPools'):
                this.title = 'SNAT Pools';
                if(this.comesfromsearch)
                    this.snatpools = this.devicesService.searchSNATPoolsFromHostname(this.device.hostname,this.offset,this.search);   
                else
                    this.snatpools = this.devicesService.getSNATPoolsFromHostname(this.device.hostname,this.offset);
                this.busy = this.snatpools.subscribe();
                break;
            case('certificates'):
                this.title = 'SSL Certificates';
                if(this.comesfromsearch)
                    this.certificates = this.devicesService.searchCertsFromHostname(this.device.hostname,this.offset,this.search);   
                else
                    this.certificates = this.devicesService.getCertsFromHostname(this.device.hostname,this.offset);
                this.busy = this.certificates.subscribe();
                break;
            default:
                this.reset(true);
                break;
        }
        this.objectSelected = option;
        //this.comesfromsearch=false;
    }


    public openDialog(option: string, id: string, hostname: string): void {
        // TODO resolve issue with dialog and link
        const config = new MatDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        let component;

        switch (option) {
            case('virtuals'):
                component = VirtualDetailComponent;
                break;
            case('monitors'):
                component = MonitorDetailComponent;
                break;
            case('irule'):
                component = iRuleDetailComponent;
                break;
            case('pools'):
                component = PoolDetailComponent;
                break;
            case('nodes'):
                component = NodeDetailComponent;
                break;
            case('certificates'):
                component = CertificateDetailComponent;
                break;
            case('snatpool'):
                component = SNATPoolDetailComponent;
                break;
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
