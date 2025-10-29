import {Component, OnInit} from '@angular/core';
import {GSLBService} from '../../../services/gslb/gslb.service';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {DeviceComponent} from '../../lb/objects';

@Component({
    selector: 'app-gslbdevices',
    templateUrl: './gslbdevices.component.html',
    styleUrls: ['./gslbdevices.component.css']
})
export class GSLBDevicesComponent implements OnInit {

    devices: Observable<DeviceComponent[]>;
    selectedDevice: DeviceComponent;

    constructor(private devicesService: GSLBService,
                private router: Router) {
    }

    getDevices(): void {
        this.devices = this.devicesService.getDevices();
    }

    ngOnInit() {
        this.getDevices();
    }

    onSelect(device: DeviceComponent): void {
        this.selectedDevice = device;
    }

    gotoDetail(): void {
        this.router.navigate(['/gslbdetail', this.selectedDevice.hostname]);
    }
}
