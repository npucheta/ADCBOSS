import {Component, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DevicesService} from '../../services/lb/devices.service';
import {CiscoCSSService} from '../../services/lb/cisco-css.service';
import {AWSService} from '../../services/lb/aws.service';
import {A10Service} from '../../services/lb/a10.service';
import {RadwareService} from '../../services/lb/radware.service';
import {GenericLoadBalancerService} from '../../services/lb/generic-load-balancer.service';
import {LoadBalancerService} from '../../services/lb/load-balancer.service';
import {NetscalerService} from '../../services/lb/netscaler.service';
import {DeviceComponent} from '../lb/objects';
import {GSLBService} from '../../services/gslb/gslb.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {F5DeviceDetailComponent} from '../lb/f5-device-detail/f5-device-detail.component';
import {GSLBDeviceDetailComponent} from '../gslb/gslbdevice-detail/gslbdevice-detail.component';
import {AWSDeviceDetailComponent} from '../lb/aws-device-detail/aws-device-detail.component';
import {NetscalerDeviceDetailComponent} from '../lb/netscaler-device-detail/netscaler-device-detail.component';
import {RadwareDeviceDetailComponent} from '../lb/radware-device-detail/radware-device-detail.component';
import {ToastService} from '../../services/toast.service';
import {Subscription} from 'rxjs/Subscription';
import {DeviceFactoryService} from '../../services/device-factory.service';
import {channels, environment} from '../../shared/common';
import {SharingDataService} from '../../services/sharing-data.service';
import {MatSidenav} from '@angular/material';
import {A10DeviceDetailComponent} from '../lb/a10-device-detail/a10-device-detail.component';

@Component({
    selector: 'app-devices',
    templateUrl: 'devices.component.html',
    styleUrls: ['devices.component.css']
})
export class DevicesComponent implements OnInit, OnDestroy {

    title: string;
    loadbalancerService: LoadBalancerService;
    lbdevices: Observable<DeviceComponent[]>;
    // gslbdevices: Observable<DeviceComponent[]>;
    option: string;
    wait = false;
    isDialog = false;
    device: DeviceComponent = null;
    deviceTypes: Array<any>;
    busy: Subscription;
    objectSelected: string;
    deviceSelected: string;
    @ViewChild(F5DeviceDetailComponent)
    private _deviceDetailLB: F5DeviceDetailComponent;
    @ViewChild(GSLBDeviceDetailComponent)
    private _deviceDetailGSLB: GSLBDeviceDetailComponent;
    @ViewChild(AWSDeviceDetailComponent)
    private _AWSDeviceDetailComponent: AWSDeviceDetailComponent;
    @ViewChild(NetscalerDeviceDetailComponent)
    private _NetscalerDeviceDetailComponent: NetscalerDeviceDetailComponent;
    @ViewChild(RadwareDeviceDetailComponent)
    private _RadwareDeviceDetailComponent: RadwareDeviceDetailComponent;
    @ViewChild(A10DeviceDetailComponent)
    private _A10DeviceDetailComponent: A10DeviceDetailComponent;
    // types of devices
    // @ViewChild(DeviceF5Component) // TODO replaced with SharingDataService because WARNING in Circular dependency detected:
    // private _deviceF5: DeviceF5Component;
    action: string;
    readonly SELF_CHANNEL = channels.CHANNEL_FOR_APP_DEVICES; // this should be unique
    readonly EXISTING_DEVICES = [
        'f5',
        'citrix-netscaler',
        'radware-alteon',
        'cisco-css',
        'aws-elb',
        'a10'
    ];
    defaultDevice = this.EXISTING_DEVICES[0];
    defaultOption = 'list';
    typeDevice = 'lb';

    constructor(private _devicesService: DevicesService,
                private _gslbdevicesService: GSLBService,
                private _netscalerService: NetscalerService,
                private _ciscoCSSService: CiscoCSSService,
                private _radwareService: RadwareService,
                private _awsService: AWSService,
                private _genericLoadBalancer: GenericLoadBalancerService,
                private _a10Service: A10Service,
                private _route: ActivatedRoute,
                public sharingDataService: SharingDataService,
                public deviceFactoryService: DeviceFactoryService,
                public toast: ToastService,
                public viewContainerRef: ViewContainerRef) {
    }

    ngOnInit() {
        this.getDevices();
        this.deviceTypes = this.deviceFactoryService.deviceTypes;

        this._route.params.subscribe(param => {
            if (environment.DEBUG) {
                console.log('param option ==>', param.option);
                console.log('param device ==>', param.device);
            }
            this.objectSelected = param.option || this.defaultOption;
            this.deviceSelected = (is.inArray(param.device, this.EXISTING_DEVICES)) ? (param.device) : (this.defaultDevice);
        });
    }

    /*ngOnChanges(changes: SimpleChanges): void {
        this._cd.detectChanges();
    }*/

    public ngOnDestroy(): void {
        // this.actionSubscription.unsubscribe();
    }

    get self(): this {
        return this;
    }

    getDevices(): void {
        this.lbdevices = this._genericLoadBalancer.getDevicesAll();
        this.busy = this.lbdevices.subscribe();
    }

    // TODO simplify it
    public save(option: string): void {
        switch (option) {
            case this.EXISTING_DEVICES[0]: {
                this.sharingDataService.setData({
                    from: this.SELF_CHANNEL,
                    to: [channels.CHANNEL_FOR_APP_DEVICE_F5],
                    info: ['save']
                });
                break;
            }
            case this.EXISTING_DEVICES[1]: {
                this.sharingDataService.setData({
                    from: this.SELF_CHANNEL,
                    to: [channels.CHANNEL_FOR_APP_DEVICE_CITRIX_NETSCALER],
                    info: ['save']
                });
                break;
            }
            case this.EXISTING_DEVICES[2]: {
                this.sharingDataService.setData({
                    from: this.SELF_CHANNEL,
                    to: [channels.CHANNEL_FOR_APP_DEVICE_RADWARE_ALTEON],
                    info: ['save']
                });
                break;
            }
            case this.EXISTING_DEVICES[3]: {
                this.sharingDataService.setData({
                    from: this.SELF_CHANNEL,
                    to: [channels.CHANNEL_FOR_APP_DEVICE_CISCO_CSS],
                    info: ['save']
                });
                break;
            }
            case this.EXISTING_DEVICES[4]: {
                this.sharingDataService.setData({
                    from: this.SELF_CHANNEL,
                    to: [channels.CHANNEL_FOR_APP_DEVICE_AWS_ELB],
                    info: ['save']
                });
                break;
            }
            case this.EXISTING_DEVICES[5]: {
                this.sharingDataService.setData({
                    from: this.SELF_CHANNEL,
                    to: [channels.CHANNEL_FOR_APP_DEVICE_A10],
                    info: ['save']
                });
                break;
            }
        }
    }

    // TODO simplify it
    public reset(option: string) {
        switch (option) {
            case this.EXISTING_DEVICES[0]: {
                this.sharingDataService.setData({
                    from: this.SELF_CHANNEL,
                    to: [channels.CHANNEL_FOR_APP_DEVICE_F5],
                    info: ['reset']
                });
                break;
            }
            case this.EXISTING_DEVICES[1]: {
                this.sharingDataService.setData({
                    from: this.SELF_CHANNEL,
                    to: [channels.CHANNEL_FOR_APP_DEVICE_CITRIX_NETSCALER],
                    info: ['reset']
                });
                break;
            }
            case this.EXISTING_DEVICES[2]: {
                this.sharingDataService.setData({
                    from: this.SELF_CHANNEL,
                    to: [channels.CHANNEL_FOR_APP_DEVICE_RADWARE_ALTEON],
                    info: ['reset']
                });
                break;
            }
            case this.EXISTING_DEVICES[3]: {
                this.sharingDataService.setData({
                    from: this.SELF_CHANNEL,
                    to: [channels.CHANNEL_FOR_APP_DEVICE_CISCO_CSS],
                    info: ['reset']
                });
                break;
            }
            case this.EXISTING_DEVICES[4]: {
                this.sharingDataService.setData({
                    from: this.SELF_CHANNEL,
                    to: [channels.CHANNEL_FOR_APP_DEVICE_AWS_ELB],
                    info: ['reset']
                });
                break;
            }
             case this.EXISTING_DEVICES[5]: {
                this.sharingDataService.setData({
                    from: this.SELF_CHANNEL,
                    to: [channels.CHANNEL_FOR_APP_DEVICE_A10],
                    info: ['reset']
                });
                break;
            }
        }
    }

    public sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async loopCheckConfgDump(deviceName: String) {
        await this.sleep(5000);
        this.loadbalancerService.isConfigDumpCompleted(deviceName).subscribe(configdumpCompleted => {
            if (configdumpCompleted) {
                console.log('Config Dump completed');
            } else {
                console.log('Waiting for configDump to complete');
                this.loopCheckConfgDump(deviceName);
            }
        });
    }

    public async loopCheckDeviceAdded(deviceName: string) {
        await this.sleep(5000); // TODO arbitrary 5 sec delay
        this.loadbalancerService.isDeviceAdded(deviceName).subscribe(deviceAdded => {
            if (deviceAdded) {
                console.log('Device added successfully');
                this.getDevices(); //Refresh view
                this.loadbalancerService.dumpConfig(deviceName);
            } else {
                console.log('Waiting for device to be added');
                this.loopCheckConfgDump(deviceName);
            }
        });
    }

    public async deleteDevice(device: DeviceComponent) {
        console.log('deleting', device);
        this.deviceFactoryService.returnSpecificService(device).deleteDevice(device.hostname);
        await this.sleep(5000); // TODO arbitrary 5 sec delay for refresh. should be changed to subscribe/promise
        this.getDevices(); //Refresh view
    }

    private dumpConfig(device: DeviceComponent): void {
        this.deviceFactoryService.returnSpecificService(device).dumpConfig(device.hostname);
    }

    public openDetailslb(device, sv: MatSidenav): void {
        let vendor=device.vendor;
        this.typeDevice=vendor;
        this.device=device;

        if (environment.DEBUG) {
            console.log(device.modules);
            console.log(vendor);
        }

        switch (vendor) {
            case 'aws-elb':
                this._AWSDeviceDetailComponent.reset(true);
                break;
            case 'Netscaler':
            case 'netscaler':
                this._NetscalerDeviceDetailComponent.reset(true);
                break;
            case 'radware':
                this._RadwareDeviceDetailComponent.reset(true);
                break;
            case 'a10':
                this._A10DeviceDetailComponent.reset(true);
                break;
            case 'f5':
            case 'F5':
            default:
            {
                if (device.modules && device.modules.includes('LTM')) {
                    this.typeDevice = 'lb';
                    this._deviceDetailLB.reset(true);
                }
                if (device.modules && device.modules.includes('GTM')) {
                    this.typeDevice = 'gslb';
                    this._deviceDetailGSLB.reset(true);
                }
            }break;
        }
        sv.open().then();
    }

    public toggleMe(e) {
        e.toggle();
    }
}
