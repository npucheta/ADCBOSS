import {Observable} from 'rxjs/Observable';
import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {DeviceFactoryService} from '../../services/device-factory.service';
import {GenericLoadBalancerService} from '../../services/lb/generic-load-balancer.service';
import {DeviceComponent} from '../lb/objects';
import {ArchiveDetailComponent} from '../archive-detail/archive-detail.component';

@Component({
    selector: 'app-archives',
    templateUrl: './archives.component.html',
    styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit {
    archives: Observable<String[]>;
    lbdevices: Observable<DeviceComponent[]>;
    @ViewChild(ArchiveDetailComponent)
    private _archiveDetail: ArchiveDetailComponent;
    selectedDevice: DeviceComponent;
    archiveAction: string;
    busy: Promise<any>;

    constructor(private genericLoadBalancerService: GenericLoadBalancerService,
                public viewContainerRef: ViewContainerRef,
                private deviceFactoryService: DeviceFactoryService) {
    }

    ngOnInit() {
        this.getDevices();
    }

    getDevices(): void {
        this.busy = this.genericLoadBalancerService.getHWDevicesAll().toPromise();
        this.lbdevices = Observable.fromPromise(this.busy);
    }

    public generateArchive(device: DeviceComponent) {
        this.deviceFactoryService.returnSpecificService(device).createArchive(device);
    }

    public openArchives(device, sv): void {
        this.selectedDevice = device;
        this.archiveAction = 'list';
        if (this._archiveDetail) {
            this._archiveDetail.reset(true);
        }
        sv.open();
    }

    public compareArchives(device, sv): void {
        this.selectedDevice = device;
        this.archiveAction = 'compare';
        if (this._archiveDetail) {
            this._archiveDetail.reset(true);
        }
        sv.open();
    }
}
