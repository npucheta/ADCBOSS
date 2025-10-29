import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DeviceComponent, VirtualStatComponent} from '../lb/objects';
import {DevicesService} from '../../services/lb/devices.service';
import {GSLBService} from '../../services/gslb/gslb.service';
import {WideIPComponent} from '../gslb/GSLBobjects';
import {environment} from '../../shared/common';

@Component({
    selector: 'app-stats',
    templateUrl: 'stats.component.html',
    styleUrls: []
})
export class StatsComponent implements OnInit {
    lbdevices: Observable<DeviceComponent[]>;
    sourcedevice: DeviceComponent;
    gslbdevices: Observable<DeviceComponent[]>;
    gslbstats: Observable<WideIPComponent[]>;
    stats: Observable<VirtualStatComponent[]>;
    hostname: String;
    isLB: boolean;
    isGSLB: boolean;

    // busy: Promise<any>;

    constructor(private devicesService: DevicesService,
                private gslbdeviceService: GSLBService) {
    }

    ngOnInit() {
        this.hostname = '';
        // this.busy = this.devicesService.getDevices().toPromise();
        // this.lbdevices = Observable.fromPromise(this.busy);
        this.lbdevices = this.devicesService.getDevicesAll();
        // this.gslbdevices = this.gslbdeviceService.getDevices();
    }

    public GetStats() {
        this.hostname = this.sourcedevice.hostname;
        if (environment.DEBUG) {
            console.log('Source device is ', this.sourcedevice);
        }
        // this.busy = this.devicesService.GetVirtualStats(this.sourcedevice).toPromise();
        // this.stats = Observable.fromPromise(this.busy);
        if (this.ltmSelected()) {
            this.stats = this.devicesService.GetVirtualStats(this.sourcedevice.hostname);
        }
        if (this.gtmSelected()) {
            //this.gslbstats = this.gslbdeviceService.getWideIPs();
        }
    }

    public RefreshStats(device) {
        this.sourcedevice = device;
        this.hostname = this.sourcedevice.hostname;
        if (environment.DEBUG) {
            console.log('Refresh Stats | Source device is ' + this.sourcedevice);
        }
        if (this.ltmSelected()) {
            this.devicesService.RefreshStats(this.sourcedevice.hostname);
        }
        if (this.gtmSelected()) {
            this.gslbdeviceService.RefreshStats(this.sourcedevice.hostname);
        }
    }

    public ltmSelected() {
        if (this.sourcedevice) {
            if ('' !== this.sourcedevice.hostname && this.sourcedevice.modules.includes('LTM')) {

                return true;
            }
        }
        return false;
    }

    public gtmSelected() {
        if (this.sourcedevice) {
            if ('' !== this.sourcedevice.hostname && this.sourcedevice.modules.includes('GTM')) {
                return true;
            }
        }
        return false;
    }

    public anySelected() {
        return this.ltmSelected() || this.gtmSelected();
    }
}
