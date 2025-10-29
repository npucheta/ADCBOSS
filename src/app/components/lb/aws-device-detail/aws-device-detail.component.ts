import {Component, OnInit, Input, ViewContainerRef, OnDestroy} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSidenav} from '@angular/material';
import {AWSService} from '../../../services/lb/aws.service';
import {AWSListenerDetailComponent} from '../aws-objects-detail/awslistener-detail/awslistener-detail.component';
import {AWSzoneDetailComponent} from '../aws-objects-detail/awszone-detail/awszone-detail.component';
import {AWSruleDetailComponent} from '../aws-objects-detail/awsrule-detail/awsrule-detail.component';
import {AWSactionDetailComponent} from '../aws-objects-detail/awsaction-detail/awsaction-detail.component';
import {AWStargetgroupDetailComponent} from '../aws-objects-detail/awstargetgroup-detail/awstargetgroup-detail.component';
import {AWStargetDetailComponent} from '../aws-objects-detail/awstarget-detail/awstarget-detail.component';
import {AWSsslpolicyDetailComponent} from '../aws-objects-detail/awssslpolicy-detail/awssslpolicy-detail.component';
import {AWSELBDetailComponent} from '../aws-objects-detail/awselbdetail/awselbdetail.component';
import {Subscription} from 'rxjs/Subscription';
import {DeviceDetailComponent} from '../device-detail/device-detail.component';
import {SharingDataService} from '../../../services/sharing-data.service';
import {DeviceComponent} from '../objects';



@Component({
    selector: 'app-aws-device',
    templateUrl: './aws-device-detail.component.html',
    styleUrls: ['./aws-device-detail.component.css']
})
export class AWSDeviceDetailComponent extends DeviceDetailComponent {
    @Input() device: DeviceComponent = null;
    loadbalancers: Observable<AWSDeviceDetailComponent[]>;
    listeners: Observable<AWSListenerDetailComponent[]>;
    zones: Observable<AWSzoneDetailComponent[]>;
    rules: Observable<AWSruleDetailComponent[]>;
    actions: Observable<AWSactionDetailComponent[]>;
    targetgroups: Observable<AWStargetgroupDetailComponent[]>;
    targets: Observable<AWStargetDetailComponent[]>;
    sslpolicies: Observable<AWSsslpolicyDetailComponent[]>;

    // selectedVirtual: VirtualComponent;
    objectSelected: string;
    dialogRef: MatDialogRef<any>;
    options: object[];
    defaultOption = 'ELB';
    OPTIONS_DEVICE: object[] =
    [
        {id: 1, name: 'device', value: 'AWS API Details', status: 1},
        {id: 2, name: 'loadbalancers', value: 'AWS Load Balancers', status: 1},
        {id: 4, name: 'listeners', value: 'AWS Listeners', status: 1},
        {id: 5, name: 'zones', value: 'AWS Zones', status: 1},
        {id: 6, name: 'rules', value: 'AWS Rules', status: 1},
        {id: 7, name: 'actions', value: 'AWS Actions', status: 1},
        {id: 8, name: 'targetgroups', value: 'AWS Target Groups', status: 1},
        {id: 9, name: 'sslpolicies', value: 'AWS SSL Policies', status: 1},
        {id: 10, name: 'targets', value: 'AWS Targets', status: 1}
    ];
    constructor(protected AWSService: AWSService,
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
            case('ELB'):
                this.reset(true);
                // let confDump: boolean;
                // this.device = event.device;
                // this.devicesService.isConfigDumpCompleted(this.device.hostname).subscribe(x=>{confDump=x});
                break;
            case('loadbalancers'):
                if(this.comesfromsearch)
                    this.loadbalancers = this.AWSService.searchloadbalancers(this.device.hostname,this.offset,this.search);
                else
                    this.loadbalancers = this.AWSService.getloadbalancers(this.device.hostname,this.offset);   
                this.busy = this.loadbalancers.subscribe();
                break;
            case('listeners'):
                if(this.comesfromsearch)
                    this.listeners = this.AWSService.searchListeners(this.device.hostname,this.offset,this.search);
                else
                    this.listeners = this.AWSService.getListeners(this.device.hostname,this.offset);
                this.busy = this.listeners.subscribe();
                break;
            case('zones'):
                if(this.comesfromsearch)
                    this.zones = this.AWSService.searchZones(this.device.hostname,this.offset,this.search);
                else
                    this.zones = this.AWSService.getZones(this.device.hostname,this.offset);
                this.busy = this.zones.subscribe();
                break;
            case('rules'):
                if(this.comesfromsearch)
                    this.rules = this.AWSService.searchRules(this.device.hostname,this.offset,this.search);
                else
                    this.rules = this.AWSService.getRules(this.device.hostname,this.offset);
                this.busy = this.rules.subscribe();
                break;
            case('actions'):
                if(this.comesfromsearch)
                   this.actions = this.AWSService.searchActions(this.device.hostname,this.offset,this.search);
                else
                    this.actions = this.AWSService.getActions(this.device.hostname,this.offset);
                this.busy = this.actions.subscribe();
                break;
            case('targetgroups'):
                if(this.comesfromsearch)
                    this.targetgroups = this.AWSService.searchTargetgroups(this.device.hostname,this.offset,this.search);
                else
                    this.targetgroups = this.AWSService.getTargetgroups(this.device.hostname,this.offset);               
                this.busy = this.targetgroups.subscribe();
                break;
            case('targets'):
                if(this.comesfromsearch)
                    this.targets = this.AWSService.searchTargets(this.device.hostname,this.offset,this.search);
                else
                    this.targets = this.AWSService.getTargets(this.device.hostname,this.offset);
                
                this.busy = this.targets.subscribe();
                break;
            case('sslpolicies'):
                if(this.comesfromsearch)
                    this.sslpolicies = this.AWSService.searchSSLPolicies(this.device.hostname,this.offset,this.search);
                else
                     this.sslpolicies = this.AWSService.getSSLPolicies(this.device.hostname,this.offset);
                   
                this.busy = this.sslpolicies.subscribe();
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
            case('loadbalancers'):
                this.dialogRef = this.dialog.open(AWSELBDetailComponent, config);
                break;
            case('listeners'):
                this.dialogRef = this.dialog.open(AWSListenerDetailComponent, config);
                break;
            case('zones'):
                this.dialogRef = this.dialog.open(AWSzoneDetailComponent, config);
                break;
            case('rules'):
                this.dialogRef = this.dialog.open(AWSruleDetailComponent, config);
                break;
            case('actions'):
                this.dialogRef = this.dialog.open(AWSactionDetailComponent, config);
                break;
            case('targetgroups'):
                this.dialogRef = this.dialog.open(AWStargetgroupDetailComponent, config);
                break;
            case('targets'):
                this.dialogRef = this.dialog.open(AWStargetDetailComponent, config);
                break;
            case('sslpolicies'):
                this.dialogRef = this.dialog.open(AWSsslpolicyDetailComponent, config);
                break;
            default:
                break;
        }
        if (this.dialogRef) {
            this.dialogRef.componentInstance.id = id;
            this.dialogRef.componentInstance.hostname = hostname;
        }
        this.dialogRef.afterClosed().subscribe(() => {
            this.dialogRef = null;
        });
    }
}
