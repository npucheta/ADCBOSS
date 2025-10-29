import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../shared/common';
import {DevicesService} from '../../../../services/lb/devices.service';
import {DeviceComponent} from '../../objects';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-object-clean-up',
    templateUrl: './object-clean-up.component.html',
    styleUrls: []
})
export class ObjectCleanUPComponent implements OnInit {
    lbdevices: Observable<DeviceComponent[]>;
    targetdevice_for_cleanup: string;

    constructor(private devicesService: DevicesService) {
    }

    ngOnInit() {
        this.lbdevices = this.devicesService.getDevices();
    }

    objectCleanUP(): void {
        if (environment.DEBUG) {
            console.log('performing Object clean-up ' + this.targetdevice_for_cleanup);
        }
        this.devicesService.ObjectCleanUp(this.targetdevice_for_cleanup, 'pools');
    }
}
