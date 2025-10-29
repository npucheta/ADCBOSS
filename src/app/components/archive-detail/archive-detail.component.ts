import {Component, Input, OnChanges, ViewChild, ViewContainerRef} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {GenericLoadBalancerService} from '../../services/lb/generic-load-balancer.service';
import {LoadBalancerService} from '../../services/lb/load-balancer.service';
import {Observable} from 'rxjs/Observable';
import {MatSidenav} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {DeviceFactoryService} from '../../services/device-factory.service';
import {DeviceComponent} from '../lb/objects';
import {environment} from '../../shared/common';


@Component({
    selector: 'app-archive-detail',
    templateUrl: './archive-detail.component.html',
    styleUrls: ['./archive-detail.component.css']
})
export class ArchiveDetailComponent implements OnChanges {
    @Input() device: DeviceComponent;
    @Input() action: string;
    @ViewChild('sNavDiff')
    private sideNav: MatSidenav;
    // configfile :Observable<String>;
    configfile: String;
    archiveLocation: String;
    archives: Observable<String[]>;
    files_in_archive_1: Observable<String[]>;
    files_in_archive_2: Observable<String[]>;
    archive1: String;
    archive2: String;
    file_for_comparison_in_archive1: String;
    file_for_comparison_in_archive2: String;
    show_files_in_archive: Boolean;
    selectedFile1: number;
    selectedFile2: number;
    selected1 = false;
    selected2 = false;
    busy: Subscription;
    deviceService: LoadBalancerService;

    constructor(private genericLoadBalancerService: GenericLoadBalancerService,
                public viewContainerRef: ViewContainerRef,
                private deviceFactoryService: DeviceFactoryService) {
    }

    ngOnChanges() {
        console.log('from onChanges', this.device);
        this.archive1 = '';
        this.archive2 = '';
        this.file_for_comparison_in_archive1 = '';
        this.file_for_comparison_in_archive2 = '';
        this.files_in_archive_1 = null;
        this.files_in_archive_2 = null;
        this.selectedFile1 = null;
        this.selectedFile2 = null;
        this.selected1 = false;
        this.selected2 = false;
        this.show_files_in_archive = false;
        this.deviceService = this.deviceFactoryService.returnSpecificService(this.device);
        this.archives = this.deviceService.listArchivesHostname(this.device);
        this.busy = this.archives.subscribe();
        this.archiveLocation = this.deviceFactoryService.returnArchiveLocation(this.device);
    }

    public getFilesInArchive1() {
        this.files_in_archive_1 = this.deviceService.listFilesFromArchive(this.archive1);
    }

    public getFilesInArchive2() {
        this.files_in_archive_2 = this.deviceService.listFilesFromArchive(this.archive1);
    }

    public markFileForComparisonInArchive1(file: string, index: number): void {
        this.selectedFile1 = index;
        this.file_for_comparison_in_archive1 = file;
        this.selected1 = true;
    }

    public markFileForComparisonInArchive2(file: string, index: number): void {
        this.selectedFile2 = index;
        this.file_for_comparison_in_archive2 = file;
        this.selected2 = true;
    }

    public compareArchives(sv): void {
        if (environment.DEBUG) {
            console.log('Will compare: ' + this.archive1 + '/' + this.file_for_comparison_in_archive1);
            console.log('AND         : ' + this.archive2 + '/' + this.file_for_comparison_in_archive2);
        }
        // this.configfile=this.devicesService.getConfigFileInArchive(this.archive1,this.file_for_comparison_in_archive1);
        sv.open();
    }

    public reset(init?: boolean): void {
        if (init) {
            this.sideNav.close().then(() => {
                return true;
            });
        }
    }
}
