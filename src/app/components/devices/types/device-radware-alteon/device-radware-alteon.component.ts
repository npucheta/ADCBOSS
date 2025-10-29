import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {channels, environment, isForMe} from '../../../../shared/common';
import {TypeDeviceInterface} from '../../../../interfaces/type-device.interface';
import {DevicesComponent} from '../../devices.component';
import {Subscription} from 'rxjs/Subscription';
import {ChannelService} from '../../../../services/channel.service';
import {SharingDataService} from '../../../../services/sharing-data.service';
import {RadwareService} from '../../../../services/lb/radware.service';
@Component({
    selector: 'app-device-radware-alteon',
    templateUrl: './device-radware-alteon.component.html',
    styles: []
})
export class DeviceRadwareAlteonComponent implements TypeDeviceInterface, OnInit, AfterViewInit, OnDestroy {

    form: FormGroup;
    ipaddress: string;
    devicename: string;
    username: string;
    password: string;
    datacenter: string;
    getConfiguration: boolean;
    isGSLB: boolean;
    isLB: boolean;
    @Input()
    title: string;
    @Input()
    parent: DevicesComponent;
    @Input()
    deviceType: string;
    actionSubscription: Subscription;
    data: ChannelService;
    readonly SELF_CHANNEL = channels.CHANNEL_FOR_APP_DEVICE_RADWARE_ALTEON; // this should be unique

    constructor(private _cd: ChangeDetectorRef, public sharingDataService: SharingDataService,public radwareService:RadwareService) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            deviceTypes: new FormControl(),
            deviceName: new FormControl(),
            ip: new FormControl(),
            getConfiguration: new FormControl(true),
            isLB: new FormControl(true),
            isGSLB: new FormControl(),
            username: new FormControl(),
            password: new FormControl(),
            dataCenter: new FormControl()
        });

        this.actionSubscription = this.sharingDataService.dataSource$
            .subscribe(data => {
                if (isForMe(this.SELF_CHANNEL, data.to)) {
                    if (environment.DEBUG) {
                        console.log('from init RADWARE action ==>', data);
                    }
                    this.data = data;
                    switch (this.data.info[0]) {
                        case 'save':
                            this.save();
                            break;
                        case 'reset':
                            this.reset();
                            break;
                    }
                }
            });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.parent.title = this.title;
        }, 200);

        this.getConfiguration = true;
        this.isLB = true;
        this._cd.detectChanges();
    }

    public ngOnDestroy(): void {
        this.actionSubscription.unsubscribe();
    }

    public save() {
        if (environment.DEBUG) {
            console.log('save from child');
            console.log(this.devicename);
            console.log(this.ipaddress);
            console.log(this.deviceType);
            console.log(this.username);
            console.log(this.password);
        }

        this.parent.loadbalancerService = this.radwareService;
        this.parent.wait = true;
        this.parent.loadbalancerService.addDevice(this.devicename, this.username, this.password, this.getConfiguration, this.deviceType, this.deviceType);

        if (this.isLB && this.getConfiguration) {
            this.parent.loopCheckDeviceAdded(this.devicename).then(() => {
                this.parent.toast.showSuccess(); // TODO make directive or add to addDevice
                this.reset();
                this.parent.wait = false; // TODO make directive or add to addDevice
            });
        } else {
            this.parent.wait = false;
            this.parent.toast.showError(); // TODO make directive or add to addDevice
        }

        this.parent.getDevices();
    }

    public reset() {
        this.form.reset({
            getConfiguration: new FormControl(true),
            isLB: new FormControl(true)
        });
    }
}
