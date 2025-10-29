import {Component, OnInit} from '@angular/core';
import {DevicesService} from '../../../../services/lb/devices.service';
import {TaskService} from '../../../../services/task.service'; 
import {GenericLoadBalancerService} from '../../../../services/lb/generic-load-balancer.service';
import {DeviceComponent} from '../../objects';
import {environment} from '../../../../shared/common';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-lbmigration',
    templateUrl: './lbmigration.component.html',
    styleUrls: []
})
export class LBMigrationComponent implements OnInit {
    lbdevices: Observable<DeviceComponent[]>;
    targetdevice: DeviceComponent;
    sourcedevice: DeviceComponent;
    targetvendor: string;
    sourcevendor: string;

    constructor(private _genericLoadBalancer: GenericLoadBalancerService,
                private taskService:TaskService) {
    }

    ngOnInit() {
        this.lbdevices = this._genericLoadBalancer.getDevicesAll();
        //this.lbdevices = this.devicesService.getDevices();
        //this.sourceDevices = [];
        //this.targetdevice = '';
        //this.sourcedevice = '';
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    /*
    async loopCheckDeviceMigrated(deviceName: String) {
        await this.sleep(5000);
        // const config_status;
        this.devicesService.isConfigurationMigrated(deviceName).subscribe(deviceAdded => {
            if (!deviceAdded) {
                if (environment.DEBUG) {
                    console.log('Waiting for device to be migrated');
                }
                this.loopCheckDeviceMigrated(deviceName);
            } else {
                if (environment.DEBUG) {
                    console.log('Configuration Migrated succesfully');
                    console.log('Getting configuration from target device');
                }
                this.devicesService.dumpConfig(deviceName);
            }
        });
    }
    */
    // TODO add validation between selects
    addDeviceAsSource(): void {
        /*
        if (this.sourcedevice && this.checkifNotInSource(this.sourcedevice)) {
            this.sourceDevices.push(this.sourcedevice);
            this.markDeviceAsSource(this.sourcedevice);
        }*/
    }
    /*
    markDeviceAsTarget(device: DeviceComponent) {
        if (environment.DEBUG) {
            console.log('Marking as Target' + device);
        }
       // this.devicesService.markDeviceAsTarget(device);
        this.targetdevice = device.hostname;
        this.targetvendor = device.vendor;
    }

    markDeviceAsSource(device: DeviceComponent) {
        if (environment.DEBUG) {
            console.log('Marking as Source' + device);
        }
        this.sourcedevice = device.hostname;
        this.sourcevendor = device.vendor;
    }

    checkifNotInSource(device: string): boolean {
        //return this.sourceDevices.indexOf(device) === -1;
        return this.sourcedevice!==device;
    }*/

    arpModification(): void {
           //this.devicesService.ARPMGMT(this.targetdevice_for_ARP, this.arp_value);
    }

    migrateConfiguration(): void {
        if (environment.DEBUG) {
            console.log('Migrating');
        }
        this.taskService.createMigrationTasks('Oscar',this.sourcedevice,this.targetdevice);
          // this.devicesService.migrateConfig();
          // this.loopCheckDeviceMigrated(this.targetdevice);
        // When Migration Done, reset flags and dump config from target
        // this.devicesService.getDevices().subscribe(devices=>{devices.map(x=>this.devicesService.resetMigrationFlags(x.hostname))});
    }

    /*trackByFn(index, item) {
     console.log(item.hostname + ' index => ' + index);
    }*/
    
    public show_targets (device: DeviceComponent){
        if(this.sourcedevice) //only compares if source defined
         if (device.hostname==this.sourcedevice.hostname)   
            return false;
         return true;
    }
    public show_sources (device: DeviceComponent){
        if(this.targetdevice) //only compares if source defined
         if (device.hostname==this.targetdevice.hostname)   
            return false;
         return true;
    }
}
