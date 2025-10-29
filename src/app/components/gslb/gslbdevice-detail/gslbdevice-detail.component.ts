import {Component, OnInit, Input, ViewContainerRef, OnDestroy} from '@angular/core';
import {GSLBService} from '../../../services/gslb/gslb.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {DeviceComponent} from '../../lb/objects';
import {WideIPDetailComponent} from '../wide-ipdetail/wide-ipdetail.component';
import {GSLBiRuleDetailComponent} from '../gslbi-rule-detail/gslbi-rule-detail.component';
import {GSLBPoolDetailComponent} from '../gslbpool-detail/gslbpool-detail.component';
import {DataCenterDetailComponent} from '../data-center-detail/data-center-detail.component';
import {ServerDetailComponent} from '../server-detail/server-detail.component';
import {GSLBMonitorDetailComponent} from '../gslbmonitor-detail/gslbmonitor-detail.component';
import {TopologyDetailComponent} from '../topology-detail/topology-detail.component';
import {Subscription} from 'rxjs/Subscription';
import {
    WideIPComponent,
    iRuleComponent,
    PoolComponent,
    DatacenterComponent,
    ServerComponent,
    MonitorComponent,
    TopologyComponent
} from '../GSLBobjects';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {DeviceDetailComponent} from '../../lb/device-detail/device-detail.component';
import {Router} from '@angular/router';
import {SharingDataService} from '../../../services/sharing-data.service';

// TODO convert to service
const OPTIONS_DEVICE: any[] =
    [
        {id: 1, name: 'wideIPs', value: 'GTM WideIPs', status: 1},
        {id: 2, name: 'iRules', value: 'GTM iRules', status: 1},
        {id: 3, name: 'gslbpools', value: 'GTM Pools', status: 1},
        {id: 4, name: 'datacenters', value: 'GTM Datacenters', status: 1},
        {id: 5, name: 'servers', value: 'GTM Servers', status: 1},
        {id: 6, name: 'monitors', value: 'GTM Monitors', status: 1},
       // {id: 7, name: 'topology', value: 'GTM Topology', status: 1}
    ];

@Component({
    selector: 'app-gslbdevice-detail',
    templateUrl: './gslbdevice-detail.component.html',
    styleUrls: ['./gslbdevice-detail.component.css']
})
export class GSLBDeviceDetailComponent extends DeviceDetailComponent {
    @Input()
    device: DeviceComponent;
    objectSelected: string;
    wideips: Observable<WideIPComponent[]>;
    irules: Observable<iRuleComponent[]>;
    pools: Observable<PoolComponent[]>;
    datacenters: Observable<DatacenterComponent[]>;
    servers: Observable<ServerComponent[]>;
    monitors: Observable<MonitorComponent[]>;
    topologies: Observable<TopologyComponent[]>;
    dialogRef: MatDialogRef<any>;
    defaultOption = 'wideIPs';
    busy: Subscription;
    title = 'WideIPs';

    constructor(private devicesService: GSLBService,
                private route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef,
                protected sharingDataService: SharingDataService) {
                super(router,dialog,viewContainerRef,sharingDataService);
    }

    ngOnInit(): void {
        this.options = OPTIONS_DEVICE;
        this.route.params.subscribe(param => {
            this.objectSelected = param.option || this.defaultOption;
            this.changeOption(this.objectSelected || this.defaultOption);
        });
    }

    ngOnDestroy(): void {
        this.busy = null;
        this.dialog.closeAll();
    }

   /* reset(init?: boolean): void {
        if (init) {
            this.objectSelected = this.defaultOption;
            this.changeOption(this.objectSelected);
        }
    }

    public isSearchItem(search: string, objectToSearch): boolean {
        if (objectToSearch != null || objectToSearch !== undefined) {
            return search.toLowerCase().includes(objectToSearch.toLowerCase());
        }
        return true;
    }*/

    public changeOption(option: string): void {
        if(option!=this.objectSelected)
            this.offset=0; //first offset for objects retrieval

        console.log('option', option);
        switch (option) {
            case('wideIPs'):
                this.title = 'WideIPs';
                if(this.comesfromsearch)
                    this.wideips = this.devicesService.searchWideIPsFromHostname(this.device.hostname,this.offset,this.search);
                else
                    this.wideips = this.devicesService.getWideIPsFromHostname(this.device.hostname,this.offset);
                this.busy = this.wideips.subscribe(() => {
                    this.objectSelected = option;
                });
                break;
            case('iRules'):
                this.title = 'iRules';
                if(this.comesfromsearch)
                    this.irules = this.devicesService.searchiRulesFromHostname(this.device.hostname,this.offset,this.search);
                else
                    this.irules = this.devicesService.getiRulesFromHostname(this.device.hostname,this.offset);
                this.busy = this.irules.subscribe(() => {
                    this.objectSelected = option;
                });
                break;
            case('gslbpools'):
                this.title = 'GSLB Pools';
                if(this.comesfromsearch)
                    this.pools = this.devicesService.searchGSLBPoolsFromHostname(this.device.hostname,this.offset,this.search);
                else
                    this.pools = this.devicesService.getGSLBPoolsFromHostname(this.device.hostname,this.offset);
                this.busy = this.pools.subscribe(() => {
                    this.objectSelected = option;
                });
                break;
            case('datacenters'):
                this.title = 'Datacenters';
                if(this.comesfromsearch)
                    this.datacenters = this.devicesService.searchDatacentersFromHostname(this.device.hostname,this.offset,this.search);
                else
                    this.datacenters = this.devicesService.getDatacentersFromHostname(this.device.hostname,this.offset);                    
                this.busy = this.datacenters.subscribe(() => {
                    this.objectSelected = option;
                });
                break;
            case('servers'):
                this.title = 'Servers';
                if(this.comesfromsearch)
                    this.servers = this.devicesService.searchServersFromHostname(this.device.hostname,this.offset,this.search);
                else
                    this.servers = this.devicesService.getServersFromHostname(this.device.hostname,this.offset);
                this.busy = this.servers.subscribe(() => {
                    this.objectSelected = option;
                });
                break;
            case('monitors'):
                this.title = 'Monitors';
                if(this.comesfromsearch)
                    this.monitors = this.devicesService.searchMonitorsFromHostname(this.device.hostname,this.offset,this.search);
                else
                    this.monitors = this.devicesService.getMonitorsFromHostname(this.device.hostname,this.offset);
                    
                this.busy = this.monitors.subscribe(() => {
                    this.objectSelected = option;
                });
                break;
            case('topology'):
                this.title = 'Topologies';
                if(this.comesfromsearch)
                    this.topologies = this.devicesService.searchTopologiesFromHostname(this.device.hostname,this.offset,this.search);
                else
                    this.topologies = this.devicesService.getTopologiesFromHostname(this.device.hostname,this.offset);
                this.busy = this.topologies.subscribe(() => {
                    this.objectSelected = option;
                });
                break;
            default:
                this.reset(true);
                break;
        }
    }

    public openDialog(option: string, id: string, hostname: string): void {
        // TODO resolve issue with dialog and link
        const config = new MatDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        let component;
        switch (option) {
            case('wideip'):
                component = WideIPDetailComponent;
                break;
            case('gslbirule'):
                component = GSLBiRuleDetailComponent;
                break;
            case('gslbpool'):
                component = GSLBPoolDetailComponent;
                break;
            case('datacenter'):
                component = DataCenterDetailComponent;
                break;
            case('server'):
                component = ServerDetailComponent;
                break;
            case('gslbmonitor'):
                component = GSLBMonitorDetailComponent;
                break;
            case('topology'):
                component = TopologyDetailComponent;
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
}
