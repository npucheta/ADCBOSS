import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {
    DeviceComponent,
    VirtualComponent,
    ProfileComponent,
    iRuleComponent,
    PoolComponent,
    NodeComponent,
    PoolMemberComponent,
    MonitorComponent,
    SNATPoolComponent,
    CertComponent,
    HTTPProfileComponent,
    LBTuple,
    VirtualStatComponent,
    VIPStatus,
    AppMapping,
    PKIMetric
} from '../../components/lb/objects';
import {MainService} from '../main.service';
import {LoadBalancerService} from './load-balancer.service';
import {DevicesService} from './devices.service';


@Injectable()
export class  CiscoCSSService extends DevicesService{

    constructor(protected http: Http, 
                protected mainService: MainService
                ) {
       super(http,mainService);
       
    }

    public dumpConfig(device: String) {
        this.actionUrl = `${this.ServerWithApiUrl}/configdump/cisco/css?hostname=${device}`;
        console.log(this.actionUrl);
        return this.http.get(this.actionUrl, this.options).subscribe(() => {
                console.log('POST OK');
            }, error => this.mainService.handlerError(error)
        );
    }

}
