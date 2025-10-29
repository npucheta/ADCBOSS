import {Component, OnInit, ViewContainerRef, Input, OnDestroy} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {NetscalerService} from '../../../../../services/lb/netscaler.service';
import {Observable} from 'rxjs/Observable';
import {MatDialogRef, MatDialog, MatDialogConfig} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {NetscalerDBProfileDetailComponent} from '../netscaler-dbprofile-detail/netscaler-dbprofile-detail.component';
import {NetscalerHTTPProfileDetailComponent} from '../netscaler-httpprofile-detail/netscaler-httpprofile-detail.component';
import {NetscalerTCPProfileDetailComponent} from '../netscaler-tcpprofile-detail/netscaler-tcpprofile-detail.component';
import {NetscalerSSLProfileDetailComponent} from '../netscaler-sslprofile-detail/netscaler-sslprofile-detail.component';
import {NetscalerSSLDTLSProfileDetailComponent} from '../netscaler-ssldtlsprofile-detail/netscaler-ssldtlsprofile-detail.component';

import {
    DeviceComponent,
    ProfileComponent
} from '../../../objects';

// TODO convert to service
const OPTIONS_DEVICE: any[] =
    [
        {id: 1, name: 'tcpprofiles', value: 'TCP Profiles', status: 1},
        {id: 2, name: 'sslprofiles', value: 'SSL Profiles', status: 1},
        {id: 3, name: 'ssldtlsprofiles', value: 'SSL DTLS Profiles', status: 1},
        {id: 4, name: 'httpprofiles', value: 'HTTP Profiles', status: 1},
        {id: 5, name: 'dbprofiles', value: 'DB Profiles', status: 1}
    ];

@Component({
  selector: 'app-netscaler-profile-detail',
  templateUrl: './netscaler-profile-detail.component.html',
  styleUrls: ['./netscaler-profile-detail.component.css']
})
export class NetscalerProfileDetailComponent implements OnInit, OnDestroy {
    @Input() device: DeviceComponent = null;
    tcpprofiles: Observable<ProfileComponent[]>;
    sslprofiles: Observable<ProfileComponent[]>;
    ssldtlsprofiles: Observable<ProfileComponent[]>;
    httpprofiles: Observable<ProfileComponent[]>;
    dbprofiles: Observable<ProfileComponent[]>;

    options: string[];
    dialogRef: MatDialogRef<any>;
    profileSelected: string;
    defaultOption = 'httpprofiles';
    busy: Subscription;

    constructor(protected netscalerService: NetscalerService,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
    }

    ngOnInit(): void {
        this.options = OPTIONS_DEVICE;
        this.profileSelected = this.defaultOption;
        this.changeMenu();
        console.log(this.device.hostname);
    }

    ngOnDestroy(): void {
        this.busy = null;
        this.dialog.closeAll();
    }

    reset(init?: boolean): void {
        if (init) {
            this.profileSelected = this.defaultOption;
        }
    }

    public isSearchItem(search: string, objectToSearch): boolean {
        if (objectToSearch != null || objectToSearch !== undefined) {
            return search.toLowerCase().includes(objectToSearch.toLowerCase());
        }
        return true;
    }

    public changeMenu(): void {
        switch (this.profileSelected) {
            case('tcpprofiles'):
                this.tcpprofiles = this.netscalerService.getTCPProfiles(this.device.hostname);
                this.busy = this.tcpprofiles.subscribe();
                break;
            case('sslprofiles'):
                this.sslprofiles = this.netscalerService.getSSLProfiles(this.device.hostname);
                this.busy = this.sslprofiles.subscribe();
                break;
            case('ssldtlsprofiles'):
                this.ssldtlsprofiles = this.netscalerService.getSSLDTLSProfiles(this.device.hostname);
                this.busy = this.ssldtlsprofiles.subscribe();
                break;
            case('httpprofiles'):
                this.httpprofiles = this.netscalerService.getHTTPProfiles(this.device.hostname);
                this.busy = this.httpprofiles.subscribe();
                break;
            case('dbprofiles'):
                this.dbprofiles = this.netscalerService.getDBProfiles(this.device.hostname);
                this.busy = this.dbprofiles.subscribe();
                break;
            default:
                this.reset(true);
                break;
        }
    }

    openDialog(option: string, id: string, hostname: string): void {
        // TODO resolve issue with dialog and link
        const config = new MatDialogConfig();
        config.viewContainerRef = this.viewContainerRef;

        switch (option) {
            case('tcpprofiles'):
                this.dialogRef = this.dialog.open(NetscalerTCPProfileDetailComponent, config);
                break;
            case('sslprofiles'):
                this.dialogRef = this.dialog.open(NetscalerSSLProfileDetailComponent, config);
                break;
            case('ssldtlsprofiles'):
               this.dialogRef = this.dialog.open(NetscalerSSLDTLSProfileDetailComponent, config);
                break;
            case('httpprofiles'):
                this.dialogRef = this.dialog.open(NetscalerHTTPProfileDetailComponent, config);
                break;
            case('dbprofiles'):
                this.dialogRef = this.dialog.open(NetscalerDBProfileDetailComponent, config);
                break;
            default:
                break;
        }
        if(this.dialogRef){
                this.dialogRef.componentInstance.id = id;
                this.dialogRef.componentInstance.hostname = hostname;
        }
        this.dialogRef.afterClosed().subscribe(() => {
            this.dialogRef = null;
        });
    }
}
