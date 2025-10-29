import {Component, OnInit, Input, ViewContainerRef, OnDestroy} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {RadwareService} from '../../../services/lb/radware.service';
import {RadwareVirtualDetailComponent} from '../radware-objects-detail/radware-virtual-detail/radware-virtual-detail.component';
import {RadwareVirtualServiceDetailComponent} from '../radware-objects-detail/radware-virtual-service-detail/radware-virtual-service-detail.component';
import {RadwareServergroupsDetailComponent} from '../radware-objects-detail/radware-servergroups-detail/radware-servergroups-detail.component';
import {RadwareRealserversDetailComponent} from '../radware-objects-detail/radware-realservers-detail/radware-realservers-detail.component';
import {RadwareClassesDetailComponent} from '../radware-objects-detail/radware-classes-detail/radware-classes-detail.component';
import {DeviceDetailComponent} from '../device-detail/device-detail.component';
import {SharingDataService} from '../../../services/sharing-data.service';
import {DeviceComponent} from '../objects';



@Component({
    selector: 'app-radware-device',
    templateUrl: './radware-device-detail.component.html',
    styleUrls: ['./radware-device-detail.component.css']
})
export class RadwareDeviceDetailComponent extends DeviceDetailComponent {
    @Input()
    device: DeviceComponent = null;
    virtuals: Observable<RadwareVirtualDetailComponent[]>;
    virtualservices: Observable<RadwareVirtualServiceDetailComponent[]>;
    servergroups: Observable<RadwareServergroupsDetailComponent[]>;
    realservers: Observable<RadwareRealserversDetailComponent[]>;
    classes: Observable<RadwareClassesDetailComponent[]>;

    // selectedVirtual: VirtualComponent;
    objectSelected: string;
    dialogRef: MatDialogRef<any>;
    options: object[];
    defaultOption = 'device';
    busy: Subscription;

// TODO convert to service
     OPTIONS_DEVICE: object[] =
    [
        {id: 1, name: 'device', value: 'Radware device details', status: 1},
        {id: 2, name: 'virtuals', value: 'Radware Virtuals', status: 1},
        {id: 4, name: 'virtualservices', value: 'Radware Virtual Services', status: 1},
        {id: 5, name: 'servergroups', value: 'Radware Server Groups', status: 1},
        {id: 6, name: 'realservers', value: 'Radware Real Servers', status: 1}
       // {id: 7, name: 'contentclasses', value: 'Radware Content Classes', status: 1},
       // {id: 8, name: 'dataclasses', value: 'Radware Data Classes', status: 1},
       // {id: 9, name: 'networkclasses', value: 'Radware Network Classes', status: 1}

    ];

    constructor(protected radwareService: RadwareService,
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
                        this.virtuals = this.radwareService.searchVirtualsByIP(this.device.hostname,this.offset,this.search); 
                    else
                        this.virtuals = this.radwareService.searchVirtualsByName(this.device.hostname,this.offset,this.search); 

                }
                else
                    this.virtuals = this.radwareService.getVirtuals(this.device.hostname,this.offset);

                this.busy = this.virtuals.subscribe();
                break;
            case('virtualservices'):
                if(this.comesfromsearch)
                    this.virtualservices = this.radwareService.searchVirtualServices(this.device.hostname,this.offset,this.search); 
                else
                    this.virtualservices = this.radwareService.getVirtualServices(this.device.hostname,this.offset);
                this.busy = this.virtualservices.subscribe();
                break;
            case('servergroups'):
                if(this.comesfromsearch)
                    this.servergroups = this.radwareService.searchServerGroups(this.device.hostname,this.offset,this.search); 
                else
                    this.servergroups = this.radwareService.getServerGroups(this.device.hostname,this.offset);
                this.busy = this.servergroups.subscribe();
                break;
            case('realservers'):
                if(this.comesfromsearch)
                    this.realservers = this.radwareService.searchRealServers(this.device.hostname,this.offset,this.search); 
                else
                    this.realservers = this.radwareService.getRealServers(this.device.hostname,this.offset);
                this.busy = this.realservers.subscribe();
                break;
            case('classes'):
                // TODO replicate F5 profiles logic
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
            case('virtuals'):
                this.dialogRef = this.dialog.open(RadwareVirtualDetailComponent, config);
                break;
            case('virtualservices'):
                this.dialogRef = this.dialog.open(RadwareVirtualServiceDetailComponent, config);
                break;
            case('servergroups'):
                this.dialogRef = this.dialog.open(RadwareServergroupsDetailComponent, config);
                break;
            case('realservers'):
                this.dialogRef = this.dialog.open(RadwareRealserversDetailComponent, config);
                break;
            case('classes'):
                // this.dialogRef = this.dialog.open(NetscalerProfilesDetailComponent, config);
                // this.dialogRef.componentInstance.id = id;
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
