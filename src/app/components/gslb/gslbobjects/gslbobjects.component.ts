import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {GSLBService} from '../../../services/gslb/gslb.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {WideIPDetailComponent} from '../wide-ipdetail/wide-ipdetail.component';
import {GSLBiRuleDetailComponent} from '../gslbi-rule-detail/gslbi-rule-detail.component';
import {GSLBPoolDetailComponent} from '../gslbpool-detail/gslbpool-detail.component';
import {DataCenterDetailComponent} from '../data-center-detail/data-center-detail.component';
import {ServerDetailComponent} from '../server-detail/server-detail.component';
import {GSLBMonitorDetailComponent} from '../gslbmonitor-detail/gslbmonitor-detail.component';
import {DeviceComponent} from '../../lb/objects';
import {Subscription} from 'rxjs/Subscription';
import {
    DatacenterComponent,
    iRuleComponent,
    MonitorComponent,
    PoolComponent,
    ServerComponent,
    TopologyComponent,
    WideIPComponent
} from '../GSLBobjects';
import {channels, isForMe} from '../../../shared/common';
import {ChannelService} from '../../../services/channel.service';
import {SharingDataService} from '../../../services/sharing-data.service';
import {DeviceDetailComponent} from '../../lb/device-detail/device-detail.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-gslbobjects',
    templateUrl: './gslbobjects.component.html',
    styleUrls: []
})
export class GSLBObjectsComponent extends DeviceDetailComponent {
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
    busy: Subscription;
    defaultOption = 'wideips';
    title: string;

    // sharing data service
    actionSubscription: Subscription;
    data: ChannelService;
    readonly SELF_CHANNEL = channels.CHANNEL_FOR_APP_GSLB_OBJECTS; // this should be unique

    constructor(protected devicesService: GSLBService,
                protected route: ActivatedRoute,
                protected dialog: MatDialog,
                protected viewContainerRef: ViewContainerRef,
                protected router: Router,
                protected sharingDataService: SharingDataService) {
             super(router,dialog,viewContainerRef,sharingDataService);
    }

    ngOnInit(): void {
        this.route.params.switchMap(
            (params: Params) => this.devicesService.getDevice(params['id'])
        ).subscribe(device => this.device = device[0]);

        this.route.params.subscribe(param => {
            this.objectSelected = param.option || this.defaultOption;
            this.changeOption(this.objectSelected);
        });

        // listening
        this.actionSubscription = this.sharingDataService.dataSource$
            .subscribe(data => {
                console.log('receiving data ', data);
                if (isForMe(this.SELF_CHANNEL, data.to)) {
                    this.data = data;
                    switch (this.data.info[0]) {
                        case 'close-modal':
                            this.closeModal();
                            break;
                    }
                }
            });
        //
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        this.busy = null;
        this.dialog.closeAll();
        this.actionSubscription.unsubscribe();
    }

    reset(init?: boolean): void {
        if (init) {
            this.objectSelected = this.defaultOption;
        }
    }

    public changeOption(option: string): void {
        switch (option) {
            case('wideips'):
                this.title = 'WideIPs';
                if(this.comesfromsearch)
                    this.wideips = this.devicesService.searchWideIPs(this.offset,this.search);
                else
                    this.wideips = this.devicesService.getWideIPs(this.offset);
                this.busy = this.wideips.subscribe(() => {
                    this.objectSelected = option;
                });
                break;
            case('irules'):
                this.title = 'iRules';
                this.irules = this.devicesService.getiRules(this.offset);
                this.busy = this.irules.subscribe(() => {
                    this.objectSelected = option;
                });
                break;
            case('pools'):
                this.title = 'Pools';
                if(this.comesfromsearch)
                    this.pools = this.devicesService.searchGSLBPools(this.offset,this.search);
                else
                    this.pools = this.devicesService.getGSLBPools(this.offset);
                this.busy = this.pools.subscribe(() => {
                    this.objectSelected = option;
                });
                break;
            case('datacenters'):
                this.title = 'Datacenters';
                this.datacenters = this.devicesService.getDatacenters(this.offset);
                this.busy = this.datacenters.subscribe(() => {
                    this.objectSelected = option;
                });
                break;
            case('servers'):
                this.title = 'Servers';
                if(this.comesfromsearch)
                    this.servers = this.devicesService.searchServers(this.offset,this.search);
                else
                   this.servers = this.devicesService.getServers(this.offset);
                this.busy = this.servers.subscribe(() => {
                    this.objectSelected = option;
                });
                break;
            case('monitors'):
                this.title = 'Monitors';
                this.monitors = this.devicesService.getMonitors(this.offset);
                this.busy = this.monitors.subscribe(() => {
                    this.objectSelected = option;
                });
                break;
            case('topologies'):
                this.title = 'Topologies';
                this.topologies = this.devicesService.getTopologies(this.offset);
                this.busy = this.topologies.subscribe(() => {
                    this.objectSelected = option;
                });
                break;
            default:
                this.reset(true);
                break;
        }
    }

    openDialog(option: string, id: string): void {
        // TODO resolve issue with dialog and link
        let component;
        const config = new MatDialogConfig();
        config.viewContainerRef = this.viewContainerRef;

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
            default:
                break;
        }

        if (component) {
            this.dialogRef = this.dialog.open(component, config);
            this.dialogRef.componentInstance.id = id;

            this.dialogRef.afterClosed().subscribe(() => {
                this.dialogRef = null;
            });
        }
    }

    // fix issue overlap modal
    public closeModal() {
        this.dialog.closeAll();
    }
}
