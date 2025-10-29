import {Component, OnInit, ViewContainerRef, OnDestroy} from '@angular/core';
import {DevicesService} from '../../services/lb/devices.service';
import {RadwareService} from '../../services/lb/radware.service';
import {GenericLoadBalancerService} from '../../services/lb/generic-load-balancer.service';
import {LoadBalancerService} from '../../services/lb/load-balancer.service';
import {NetscalerService} from '../../services/lb/netscaler.service';
import {DeviceComponent} from '../lb/objects';
import {Subscription} from 'rxjs/Subscription';
import {environment} from '../../shared/common';
import 'rxjs/add/operator/switchMap';
import {DeviceFactoryService} from '../../services/device-factory.service';

@Component({
    selector: 'app-pki',
    templateUrl: './pki.component.html',
    styleUrls: ['./pki.component.css']
})
export class PKIComponent implements OnInit, OnDestroy {
    lbdevices: DeviceComponent[];
    CPUPKI: string[][];
    public success = false;
    public size = 250;
    cpu_busy: Promise<any>;
    busy: Subscription;
    percentageValue: (value: number) => string;
    max = 100;
    lbservice: LoadBalancerService;

    constructor(private _genericLoadBalancerService: GenericLoadBalancerService,
                private _devicesService: DevicesService,
                private _radwareService: RadwareService,
                private _netscalerService: NetscalerService,
                public viewContainerRef: ViewContainerRef,
                private _deviceFactoryService:DeviceFactoryService) {

        this.percentageValue = (value: number): string => {
            return `${Math.round(value)} / ${this.max}`;
        };
    }

    ngOnInit() {
        this._genericLoadBalancerService.getHWDevicesAll().subscribe(response => {   // TODO check if better to abstract to GenericLoadBalancer
            this.lbdevices = response; // error handling when cannot connect
            this.success = this.lbdevices.length > 0;
            for (let i = 0; i < this.lbdevices.length; i++) {
                if (environment.DEBUG) {
                    console.log('Device ' + this.lbdevices[i].hostname);
                }
                this.lbdevices[i].STATISTIC_CPU_INFO_FIVE_SEC_AVG_USAGE_RATIO = 0; // set to 0 if we don't get value
                this.lbdevices[i].STATISTIC_MEMORY_PERCENTAGE = 0;
                this.lbdevices[i].DeviceState = 'DOWN';

                if (this.lbdevices[i].modules) {
                     this.lbservice=this._deviceFactoryService.returnSpecificServiceFromVendorOnly(this.lbdevices[i].vendor);
                     this.lbservice.getPKICPUMetric('STATISTIC_CPU_INFO_FIVE_SEC_AVG_USAGE_RATIO', this.lbdevices[i].hostname).subscribe(response => {
                            if (environment.DEBUG) {
                                console.log(' CPU ' + this.lbdevices[i].STATISTIC_CPU_INFO_FIVE_SEC_AVG_USAGE_RATIO);
                            }
                            this.lbdevices[i].STATISTIC_CPU_INFO_FIVE_SEC_AVG_USAGE_RATIO = response.value;
                            this.lbdevices[i].DeviceState = 'UP';
                                                }, error => {
                            this.lbdevices[i].STATISTIC_CPU_INFO_FIVE_SEC_AVG_USAGE_RATIO = 0;
                            this.lbdevices[i].STATISTIC_MEMORY_PERCENTAGE = 0;
                            this.lbdevices[i].DeviceState = 'DOWN';
                        });

                        this.lbservice.getPKIMEMMetric('STATISTIC_MEMORY_PERCENTAGE', this.lbdevices[i].hostname).subscribe(response => {
                            if (environment.DEBUG) {
                                console.log(' MEMORY ' + this.lbdevices[i].STATISTIC_MEMORY_PERCENTAGE);
                            }
                            this.lbdevices[i].STATISTIC_MEMORY_PERCENTAGE = response.value;
                            this.lbdevices[i].DeviceState = 'UP';
                            this.lbdevices[i].STATISTIC_MEMORY_PERCENTAGE = 5; //Dummy data for F5
                        }, error => {
                            this.lbdevices[i].STATISTIC_CPU_INFO_FIVE_SEC_AVG_USAGE_RATIO = 0;
                            this.lbdevices[i].STATISTIC_MEMORY_PERCENTAGE = 0;
                            this.lbdevices[i].DeviceState = 'DOWN';
                        });
                }
            }
        });
    }

    ngOnDestroy() {
        this.CPUPKI = [];
        this.busy = null;
    }

    public sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // for tests
    public getRandomInt(min = 1, max = 100) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}
