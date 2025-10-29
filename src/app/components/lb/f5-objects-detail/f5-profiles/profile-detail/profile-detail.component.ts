import {Component, Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {DevicesService} from '../../../../../services/lb/devices.service';
import {Observable} from 'rxjs/Observable';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {HTTPProfileDetailComponent} from '../httpprofile-detail/httpprofile-detail.component';
import {TCPProfileDetailComponent} from '../tcpprofile-detail/tcpprofile-detail.component';
import {UDPProfileDetailComponent} from '../udpprofile-detail/udpprofile-detail.component';
import {FastL4ProfileDetailComponent} from '../fast-l4-profile-detail/fast-l4-profile-detail.component';
import {PersistenceProfileDetailComponent} from '../persistence-profile-detail/persistence-profile-detail.component';
import {OneConnectProfileDetailComponent} from '../one-connect-profile-detail/one-connect-profile-detail.component';
import {StreamProfileDetailComponent} from '../stream-profile-detail/stream-profile-detail.component';
import {ClientSSLProfileDetailComponent} from '../client-sslprofile-detail/client-sslprofile-detail.component';
import {ServerSSLProfileDetailComponent} from '../server-sslprofile-detail/server-sslprofile-detail.component';
import {FTPPProfileDetailComponent} from '../ftppprofile-detail/ftppprofile-detail.component';
import {HTTPClassDetailComponent} from '../../httpclass-detail/httpclass-detail.component';
import {Subscription} from 'rxjs/Subscription';
import {DeviceComponent, ProfileComponent} from '../../../objects';
import {ChannelService} from '../../../../../services/channel.service';
import {channels, isForMe} from '../../../../../shared/common';
import {SharingDataService} from '../../../../../services/sharing-data.service';

// TODO convert to service
const OPTIONS_DEVICE: any[] =
    [
        {id: 1, name: 'httpprofiles', value: 'HTTPProfiles', status: 1},
        {id: 2, name: 'tcpprofiles', value: 'TCPProfiles', status: 1},
        {id: 3, name: 'udpprofiles', value: 'UDPProfiles', status: 1},
        {id: 4, name: 'fastl4profiles', value: 'FastL4Profiles', status: 1},
        {id: 5, name: 'persistenceprofiles', value: 'PersistenceProfiles', status: 1},
        {id: 6, name: 'oneconnectprofiles', value: 'OneConnectProfiles', status: 1},
        {id: 7, name: 'streamprofiles', value: 'StreamProfiles', status: 1},
        {id: 8, name: 'clientsslprofiles', value: 'ClientSSLProfiles', status: 1},
        {id: 9, name: 'serversslprofiles', value: 'ServerSSLProfiles', status: 1},
        {id: 10, name: 'ftppprofiles', value: 'FTPPProfiles', status: 1},
        {id: 11, name: 'httpclasses', value: 'HTTPClasses', status: 1}
    ];

@Component({
    selector: 'app-profile-detail',
    templateUrl: './profile-detail.component.html',
    styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
    @Input() device: DeviceComponent = null;
    httpprofiles: Observable<ProfileComponent[]>;
    tcpprofiles: Observable<ProfileComponent[]>;
    udpprofiles: Observable<ProfileComponent[]>;
    fastL4profiles: Observable<ProfileComponent[]>;
    clientSSLprofiles: Observable<ProfileComponent[]>;
    serverSSLprofiles: Observable<ProfileComponent[]>;
    ftpprofiles: Observable<ProfileComponent[]>;
    httpclasses: Observable<ProfileComponent[]>;
    persistenceprofiles: Observable<ProfileComponent[]>;
    oneconnectprofiles: Observable<ProfileComponent[]>;
    streamprofiles: Observable<ProfileComponent[]>;
    options: string[];
    dialogRef: MatDialogRef<any>;
    profileSelected: string;
    defaultOption = 'httpprofiles';
    busy: Subscription;

    // sharing data service
    actionSubscription: Subscription;
    data: ChannelService;
    readonly SELF_CHANNEL = channels.CHANNEL_FOR_APP_PROFILE_DETAIL; // this should be unique

    constructor(private _devicesService: DevicesService,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef,
                public sharingDataService: SharingDataService) {
    }

    ngOnInit(): void {
        this.options = OPTIONS_DEVICE;
        this.profileSelected = this.defaultOption;
        this.changeOption();
        // listening
        this.actionSubscription = this.sharingDataService.dataSource$
            .subscribe(data => {
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
    }

    ngOnDestroy(): void {
        this.busy = null;
        this.dialog.closeAll();
        this.actionSubscription.unsubscribe();
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

    public changeOption(): void {
        switch (this.profileSelected) {
            case('httpprofiles'):
                this.httpprofiles = this._devicesService.getHTTPProfiles(this.device.hostname);
                this.busy = this.httpprofiles.subscribe();
                break;
            case('tcpprofiles'):
                this.tcpprofiles = this._devicesService.getTCPProfiles(this.device.hostname);
                this.busy = this.tcpprofiles.subscribe();
                break;
            case('udpprofiles'):
                this.udpprofiles = this._devicesService.getUDPProfiles(this.device.hostname);
                this.busy = this.udpprofiles.subscribe();
                break;
            case('fastl4profiles'):
                this.fastL4profiles = this._devicesService.getFastL4Profiles(this.device.hostname);
                this.busy = this.fastL4profiles.subscribe();
                break;
            case('persistenceprofiles'):
                this.persistenceprofiles = this._devicesService.getPersistenceProfiles(this.device.hostname);
                this.busy = this.persistenceprofiles.subscribe();
                break;
            case('oneconnectprofiles'):
                this.oneconnectprofiles = this._devicesService.getOneConnectProfiles(this.device.hostname);
                this.busy = this.oneconnectprofiles.subscribe();
                break;
            case('streamprofiles'):
                this.streamprofiles = this._devicesService.getStreamProfiles(this.device.hostname);
                this.busy = this.streamprofiles.subscribe();
                break;
            case('clientsslprofiles'):
                this.clientSSLprofiles = this._devicesService.getClientSSLProfiles(this.device.hostname);
                this.busy = this.clientSSLprofiles.subscribe();
                break;
            case('serversslprofiles'):
                this.serverSSLprofiles = this._devicesService.getServerSSLProfiles(this.device.hostname);
                this.busy = this.serverSSLprofiles.subscribe();
                break;
            case('ftppprofiles'):
                this.ftpprofiles = this._devicesService.getFTTPProfiles(this.device.hostname);
                this.busy = this.ftpprofiles.subscribe();
                break;
            case('httpclasses'):
                this.httpclasses = this._devicesService.getHTTPClasses(this.device.hostname);
                this.busy = this.httpclasses.subscribe();
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
            case('httpprofiles'):
                this.dialogRef = this.dialog.open(HTTPProfileDetailComponent, config);
                this.dialogRef.componentInstance.id = id;
                this.dialogRef.componentInstance.hostname = hostname;
                break;
            case('tcpprofiles'):
                this.dialogRef = this.dialog.open(TCPProfileDetailComponent, config);
                this.dialogRef.componentInstance.id = id;
                this.dialogRef.componentInstance.hostname = hostname;
                break;
            case('udpprofiles'):
                this.dialogRef = this.dialog.open(UDPProfileDetailComponent, config);
                this.dialogRef.componentInstance.id = id;
                this.dialogRef.componentInstance.hostname = hostname;
                break;
            case('fastl4profiles'):
                this.dialogRef = this.dialog.open(FastL4ProfileDetailComponent, config);
                this.dialogRef.componentInstance.id = id;
                this.dialogRef.componentInstance.hostname = hostname;
                break;
            case('persistenceprofiles'):
                this.dialogRef = this.dialog.open(PersistenceProfileDetailComponent, config);
                this.dialogRef.componentInstance.id = id;
                this.dialogRef.componentInstance.hostname = hostname;
                break;
            case('oneconnectprofiles'):
                this.dialogRef = this.dialog.open(OneConnectProfileDetailComponent, config);
                this.dialogRef.componentInstance.id = id;
                this.dialogRef.componentInstance.hostname = hostname;
                break;
            case('streamprofiles'):
                this.dialogRef = this.dialog.open(StreamProfileDetailComponent, config);
                this.dialogRef.componentInstance.id = id;
                this.dialogRef.componentInstance.hostname = hostname;
                break;
            case('clientsslprofiles'):
                this.dialogRef = this.dialog.open(ClientSSLProfileDetailComponent, config);
                this.dialogRef.componentInstance.id = id;
                this.dialogRef.componentInstance.hostname = hostname;
                break;
            case('serversslprofiles'):
                this.dialogRef = this.dialog.open(ServerSSLProfileDetailComponent, config);
                this.dialogRef.componentInstance.id = id;
                this.dialogRef.componentInstance.hostname = hostname;
                break;
            case('ftppprofiles'):
                this.dialogRef = this.dialog.open(FTPPProfileDetailComponent, config);
                this.dialogRef.componentInstance.id = id;
                this.dialogRef.componentInstance.hostname = hostname;
                break;
            case('httpclasses'):
                this.dialogRef = this.dialog.open(HTTPClassDetailComponent, config);
                this.dialogRef.componentInstance.id = id;
                this.dialogRef.componentInstance.hostname = hostname;
                break;
            default:
                break;
        }
        this.dialogRef.afterClosed().subscribe(() => {
            this.dialogRef = null;
        });
    }

    // fix issue overlap modal
    public closeModal() {
        this.dialog.closeAll();
    }
}
