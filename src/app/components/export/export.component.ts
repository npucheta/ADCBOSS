import {Component, OnInit} from '@angular/core';
import {DevicesService} from '../../services/lb/devices.service';
import {CiscoCSSService} from '../../services/lb/cisco-css.service';
import {NetscalerService} from '../../services/lb/netscaler.service';
import {RadwareService} from '../../services/lb/radware.service';
import {AWSService} from '../../services/lb/aws.service';
import {DeviceComponent} from '../lb/objects';
import {GSLBService} from '../../services/gslb/gslb.service';
import {Observable} from 'rxjs/Observable';
import {Headers, Http, RequestOptions, Response, ResponseContentType} from '@angular/http';
import {environment} from '../../shared/common';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Component({
    selector: 'app-export',
    templateUrl: 'export.component.html',
    styleUrls: []
})
export class ExportComponent implements OnInit {
    deviceName: string;
    deviceType: string;
    lbdevices: Observable<DeviceComponent[]>;
    gslbdevices: Observable<DeviceComponent[]>;
    lbdevicesToExportBoolean: boolean[];
    gslbdevicesToExportBoolean: boolean[];
    // busy: Promise<any>;

    devices: Array<any> = [ // TODO move this to service
        {value: 'Export LTM Data', realvalue: 'LTM'},
        {value: 'Export GTM Data', realvalue: 'GTM'},
        {value: 'Export Netscaler Data', realvalue: 'netscaler'},
        {value: 'Export Radware Data', realvalue: 'radware'},
        {value: 'Export AWS Data', realvalue: 'AWS'}
    ];

    constructor(private http: Http,
                private devicesService: DevicesService,
                private ciscoCSSService: CiscoCSSService,
                private netscalerService: NetscalerService,
                private radwareService: RadwareService,
                private awsService: AWSService,
                private gslbdevicesService: GSLBService) {
    }

    ngOnInit() {
        this.lbdevicesToExportBoolean = [];
        this.gslbdevicesToExportBoolean = [];
        // this.busy = this.devicesService.getDevices().toPromise();
        // this.lbdevices = Observable.fromPromise(this.busy);
        this.lbdevices = this.devicesService.getDevices();
        // this.devicesService.getDevices().subscribe(devices => {
        // TODO Move to services
        this.lbdevices.subscribe(devices => {
            devices.map(device => this.lbdevicesToExportBoolean[String(device.hostname)] = false);
        });

        // this.busy = this.gslbdevicesService.getDevices().toPromise();
        // this.gslbdevices = Observable.fromPromise(this.busy);
        this.gslbdevices = this.gslbdevicesService.getDevices();
        // this.gslbdevicesService.getDevices().subscribe(devices => {
        // TODO Move to services
        this.gslbdevices.subscribe(devices => {
            devices.map(device => this.gslbdevicesToExportBoolean[String(device.hostname)] = false);
        });

    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private export(service) {
        service.Export().subscribe(
            data => {
                this.downloadFile(data['_body']);
            }
        );
    }

    public dump(device: string): void {
        if (environment.DEBUG) {
            console.log('device ==> ', device);
        }
        switch (device) {
            case 'LTM':
                this.export(this.devicesService);
                break;
            case 'GTM':
                this.export(this.gslbdevicesService);
                break;
            case 'netscaler':
                this.export(this.netscalerService);
                break;
            case 'radware':
                this.export(this.radwareService);
                break;
            case 'AWS':
                this.export(this.awsService);
                break;
        }
    }

    downloadFile(data: Response) {
        // console.log(data);
        const blob = new Blob([data], {type: 'text/csv'});
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    }

    error_catch_example(url: string): Observable<File> { // TODO change to camelCase
        console.log('Downloading');
        const headers = new Headers({
            'Content-Type': 'application/json',
            'MyApp-Application': 'AppName',
            'Accept': 'application/csv'
        });
        const options = new RequestOptions({headers: headers, responseType: ResponseContentType.Blob});

        return this.http.post(url, '', options)
            .map(this.extractContent)
            .catch(this.handleError);
    }

    private extractContent(res: Response) {
        console.log('extracting');
        const blob: Blob = res.blob();
        window['saveAs'](blob, 'filename.csv');
    }
}
