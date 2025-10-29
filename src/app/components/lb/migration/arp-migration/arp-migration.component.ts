import {Component, OnDestroy, OnInit} from '@angular/core';
import {DevicesService} from '../../../../services/lb/devices.service';
import {DeviceComponent} from '../../objects';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../shared/common';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-arp-migration',
    templateUrl: './arp-migration.component.html',
    styleUrls: []
})
export class ArpMigrationComponent implements OnInit, OnDestroy {
    lbdevices: Observable<DeviceComponent[]>;
    targetdevice_for_ARP: string;
    arp_value: string;
    busy: Subscription;

    constructor(private devicesService: DevicesService) {
    }

    ngOnInit() {
        this.lbdevices = this.devicesService.getDevices();
    }

    ngOnDestroy() {
        this.busy = null;
    }

    arpModification(): void {
        if (environment.DEBUG) {
            console.log('Performing ARP Modification ' + ' ' + this.arp_value);
        }
        this.devicesService.ARPMGMT(this.targetdevice_for_ARP, this.arp_value);
    }
}
