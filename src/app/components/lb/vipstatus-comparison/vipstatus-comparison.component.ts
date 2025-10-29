import {Component, OnInit} from '@angular/core';
import {DevicesService} from '../../../services/lb/devices.service';
import {DeviceComponent, VIPStatus} from '../objects';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-vipstatus-comparison',
    templateUrl: './vipstatus-comparison.component.html',
    styleUrls: ['./vipstatus-comparison.component.css']
})
export class VIPStatusComparisonComponent implements OnInit {
    lbdevices: Observable<DeviceComponent[]>;
    targetdevice: String;
    sourcedevice: string;
    sourceDevices: String[];
    virtuals: Observable<VIPStatus[]>;

    constructor(private devicesService: DevicesService) {
    }

    ngOnInit() {
        this.lbdevices = this.devicesService.getDevices();
        this.sourceDevices = [];
        this.targetdevice = '';
        this.sourcedevice = '';
    }

// TODO add validation between selects
    AddDeviceAsSource(): void {
        if (this.sourcedevice && this.checkifNotInSource(this.sourcedevice)) {
            this.sourceDevices.push(this.sourcedevice);
        }
    }

    markDeviceAsTarget(device: String) {
        console.log('Marking as Target' + device);
        this.targetdevice = device;
    }

    markDeviceAsSource(device: String): void {
        console.log('Marking as Source' + device);
    }

    checkifNotInSource(device: String): boolean {
        return this.sourceDevices.indexOf(device) === -1;
    }

    MigrateConfiguration(): void {
        console.log('COmpare VIP status');
        this.virtuals = this.devicesService.compareVIPs(this.sourcedevice, this.targetdevice);
    }
}
