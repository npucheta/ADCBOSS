import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {environment} from '../../../shared/common';

@Component({
    selector: 'app-generic-object-detail',
    templateUrl: './generic-object-detail.component.html',
    styleUrls: ['./generic-object-detail.component.css']
})
export class GenericObjectDetailComponent implements OnInit, OnDestroy {
    dialogRef: MatDialogRef<any>;
    @Input()
    id: string;
    @Input()
    hostname: string;
    @Input()
    vendor: string;
    // Custom
    title: string;
    isDialog: boolean;
    protected objectKeys;
    component;

    // @Output() public navToggle: EventEmitter<any> = new EventEmitter<any>(false); // close side-nav before closing dialog for fix issue
    constructor(protected route: ActivatedRoute,
                protected router: Router,
                protected dialog: MatDialog) {
    }

    public ngOnInit(): void {
        // this.miniTitle = 'Virtual detail';
        // this.miniTitle = '';
        // this.size = '100%';
        this.isDialog = true;
        this.objectKeys = Object.keys;

        if (this.route.snapshot.params['id']) {
            this.id = this.route.snapshot.params['id'];
            this.isDialog = false;
        }
        if (this.route.snapshot.params['hostname']) {
            this.hostname = this.route.snapshot.params['hostname'];
            this.isDialog = false;
        }
        if (this.route.snapshot.params['vendor']) {
            this.vendor = this.route.snapshot.params['vendor'];
            this.isDialog = false;
        }
        if (environment.DEBUG) {
            console.log('ID ' + this.id + ' Hostname ' + this.hostname+ ' Vendor ' + this.vendor);
        }
    }

    public ngOnDestroy(): void {
        this.dialog.closeAll();
    }

// TODO implement in future and move to utils and add close automatic
    public goSelf(route: string): void {

        this.dialog.closeAll();
        if (this.dialogRef) {
            this.dialogRef.close(this.dialog);
        }
        /*if (this.id && this.hostname && this.vendor) { //vendor is only needed for certificate. moved logic there
            this.router.navigate([route, this.id, this.hostname, this.vendor]).then(() => {
                if (environment.DEBUG) {
                    console.log('id ==> ', this.id);
                    console.log('hostname ==> ', this.hostname);
                    console.log('vendor ==> ', this.vendor);
                    console.log('route ==> ', route);
                }
            });
        }
        else*/
        if (this.id && this.hostname) {
            this.router.navigate([route, this.id, this.hostname]).then(() => {
                if (environment.DEBUG) {
                    console.log('id ==> ', this.id);
                    console.log('hostname ==> ', this.hostname);
                    console.log('route ==> ', route);
                }
            });
        }

    }
}
