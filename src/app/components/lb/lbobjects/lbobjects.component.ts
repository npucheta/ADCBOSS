import {Component, Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {DevicesService} from '../../../services/lb/devices.service';
import {NetscalerService} from '../../../services/lb/netscaler.service';
import {GenericLoadBalancerService} from '../../../services/lb/generic-load-balancer.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {
    CertComponent,
    DeviceComponent,
    iRuleComponent,
    MonitorComponent,
    NodeComponent,
    PoolComponent,
    ProfileComponent,
    SNATPoolComponent,
    VirtualComponent,
    LBComponent
} from '../objects';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {iRuleDetailComponent} from '../f5-objects-detail/i-rule-detail/i-rule-detail.component';
import {MonitorDetailComponent} from '../f5-objects-detail/monitor-detail/monitor-detail.component';
import {SNATPoolDetailComponent} from '../f5-objects-detail/snatpool-detail/snatpool-detail.component';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {DeviceFactoryService} from '../../../services/device-factory.service';
import {environment} from '../../../shared/common';
import {CertificateDetailComponent} from '../../../components/lb/certificate-detail/certificate-detail.component';
import {KeyDetailComponent} from '../../../components/lb/key-detail/key-detail.component';
import {DeviceDetailComponent} from '../device-detail/device-detail.component';
import {Router} from '@angular/router';
import {SharingDataService} from '../../../services/sharing-data.service';

@Component({
    selector: 'app-lbobjects',
    templateUrl: './lbobjects.component.html',
    styleUrls: []
})
export class LBObjectsComponent extends DeviceDetailComponent {

    @Input()
    device: DeviceComponent;

    virtuals: Observable<VirtualComponent[]>;
    profiles: Observable<ProfileComponent[]>;
    irules: Observable<iRuleComponent[]>;
    pools: Observable<PoolComponent[]>;
    nodes: Observable<NodeComponent[]>;
    monitors: Observable<MonitorComponent[]>;
    snatpools: Observable<SNATPoolComponent[]>;
    certificates: Observable<CertComponent[]>;
    keys: Observable<LBComponent[]>;
    dialogRef: MatDialogRef<any>;
    objectSelected: string;
    defaultOption = 'virtuals';
    busy: Subscription;
    title: string;
    constructor(protected devicesService: DevicesService,
                protected netscalerService: NetscalerService,
                protected deviceFactory: DeviceFactoryService,
                protected genericLoadBalancerService: GenericLoadBalancerService,
                protected route: ActivatedRoute,
                protected dialog: MatDialog,
                protected router: Router,
                protected viewContainerRef: ViewContainerRef,
                protected sharingDataService: SharingDataService) {
     super(router,dialog,viewContainerRef,sharingDataService);
}

    ngOnInit(): void {
        this.route.params.subscribe(param => {
            this.offset=0; //first offset for objects retrieval
            this.objectSelected = param.option || this.defaultOption;
            this.changeOption(this.objectSelected);
        });
    }

    ngOnDestroy(): void {
        this.busy = null;
        this.dialog.closeAll();
    }

    reset(init?: boolean): void {
        if (init) {
            this.objectSelected = this.defaultOption;
        }
    }

    public changeOption(option: string): void {
        switch (option) {
            case('virtuals'):
                this.title = 'Virtuals';
                  if(this.comesfromsearch){
                    if(this.isIPaddressFlag)
                      this.virtuals = this.genericLoadBalancerService.searchVSByIP(this.offset,this.search);
                    else
                      this.virtuals = this.genericLoadBalancerService.searchVSByName(this.offset,this.search);
                  }
                  else
                        this.virtuals = this.genericLoadBalancerService.getVS(this.offset);
                this.busy = this.virtuals.subscribe(() => {
                    this.objectSelected = option;
                });
                break;
            case('irules'):
                this.title = 'iRules';
                if(this.comesfromsearch)
                    this.irules = this.devicesService.searchiRules(this.offset,this.search); // iRules are specific to f5
                else
                    this.irules = this.devicesService.getiRules(this.offset); // iRules are specific to f5                    
                this.busy = this.irules.subscribe(() => {
                    this.objectSelected = option;
                });
                break;
            case('pools'):
                this.title = 'Pools';
                if(this.comesfromsearch)
                    this.pools = this.genericLoadBalancerService.searchPools(this.offset,this.search);
                else
                    this.pools = this.genericLoadBalancerService.getPools(this.offset);
                   
                this.busy = this.pools.subscribe(() => {
                    this.objectSelected = option;
                });
                break;
            case('nodes'):
                this.title = 'Nodes';
                if(this.comesfromsearch)
                    this.nodes = this.genericLoadBalancerService.searchNodes(this.offset,this.search);
                else
                    this.nodes = this.genericLoadBalancerService.getNodes(this.offset);
                    
                this.busy = this.nodes.subscribe(() => {
                    this.objectSelected = option;
                });
                break;
             case('certificates'):
                this.title = 'SSL Certificates';
                if(this.comesfromsearch)
                    this.certificates = this.genericLoadBalancerService.searchCertificates(this.offset,this.search);
                else
                    this.certificates = this.genericLoadBalancerService.getCertificates(this.offset);
                    
                this.busy = this.certificates.subscribe(() => {
                    this.objectSelected = option;
                });
                break;
          /*  case('monitors'):
                this.title = 'Monitors';
                this.monitors = this.devicesService.getMonitors();
                this.busy = this.monitors.subscribe(() => {
                    this.objectSelected = option;
                });
                break;
            case('snatpools'):
                this.title = 'SNATPools';
                this.snatpools = this.devicesService.getSNATPools();
                this.busy = this.snatpools.subscribe(() => {
                    this.objectSelected = option;
                });
                break;*/
            default:
                this.reset(true);
                break;
        }
    }

    protected openDialog(option: string, id: string, hostname: string, vendor: string, type: string): void {
        // TODO resolve issue with dialog and link
        if (environment.DEBUG) {
            console.log('Vendor: ' + vendor);
            console.log('Type: ' + type);
            console.log('Hostname: ' + hostname);

        }
        this.offset=1;

        const config = new MatDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        let component;

        switch (option) {
            case('virtual'):
                component = this.deviceFactory.returnVirtualComponent(vendor, type);
                break;
            case('profile'):
                component = ProfileComponent;
                break;
            case('irule'):
                component = iRuleDetailComponent;
                break;
            case('pool'):
                component = this.deviceFactory.returnPoolComponent(vendor, type);
                break;
            case('nodes'):
                component = this.deviceFactory.returnNodeComponent(vendor, type);
                break;
            case('monitor'):
                component = MonitorDetailComponent;
                break;
            case('snatpool'):
                component = SNATPoolDetailComponent;
                break;
            case('certificate'):
                component = CertificateDetailComponent;
                break;
            case('key'):
                component = KeyDetailComponent;
                break;   
            default:
                break;

        }
        if (component) {
            this.dialogRef = this.dialog.open(component, config);
            this.dialogRef.componentInstance.id = id;
            this.dialogRef.componentInstance.hostname = hostname;
            this.dialogRef.componentInstance.vendor = vendor;

            if(option == 'certificate')
                if(vendor)
                    this.dialogRef.componentInstance.vendor = vendor; //hack for missing vendor on F5 certs TODO
                else
                    this.dialogRef.componentInstance.vendor = 'F5';
            this.dialogRef.afterClosed().subscribe(() => {
                this.dialogRef = null;
            });
        }
    }
}
