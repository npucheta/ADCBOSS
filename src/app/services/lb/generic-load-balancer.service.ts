import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {VirtualComponent,PoolComponent,NodeComponent,DeviceComponent} from '../../components/lb/objects';
import {MainService} from '../main.service';
import {DevicesService} from './devices.service';
import {NetscalerService} from './netscaler.service';
import {LoadBalancerService} from './load-balancer.service';


@Injectable()
export class GenericLoadBalancerService extends LoadBalancerService{ //Class for a Generic Load Balancer 

    constructor(protected http: Http, 
                protected mainService: MainService) {
       super(http,mainService);
    }

    public getDevicesAll(): Observable<DeviceComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/devices/lb/all`;
        return super.getElement();
    }

    public getHWDevicesAll(): Observable<DeviceComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/hwdevices/lb/all`;
        return super.getElement();
    }
}
