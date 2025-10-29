import {AfterViewInit, Component, OnInit, ViewContainerRef} from '@angular/core';
import {LBTuple} from '../lb/objects';
import {Validator} from 'validator.ts/Validator';
import {GSLBTuple} from '../gslb/GSLBobjects';
import {MainService} from '../../services/main.service';
import {CanvasDialogComponent} from '../../shared/canvas-dialog/canvas-dialog.component';
import {GenericLoadBalancerService} from '../../services/lb/generic-load-balancer.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {environment} from '../../shared/common';
// import {MatDialog, MatDialogConfig, MatDialogRef, MdInputDirective} from '@angular/material';
// import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: []
})
export class SearchComponent implements OnInit, AfterViewInit {
    objectToSearch: string;
    checkedSearchVirtualServers = true;
    checkedSearchWideIPs = true;
    virtuals: LBTuple[] = [];
    wideips: GSLBTuple[] = [];
    dialogRef: MatDialogRef<any>;
    public success = false;
    protected offset: number;
    protected limit: number;  //Increment for offset (limit on query)
    // validator: Validator;
    // LBTuples: LBTuple[];
    // GSLBTuples: GSLBTuple[];
    // private orgChart: OrgChart;
    // public errors: Object;
    // @ViewChild(MdInputDirective) inputFocus: MdInputDirective;

    constructor(private _genericLoadBalancerService: GenericLoadBalancerService,
                private _mainService: MainService,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef,
                public validator: Validator) {
        this.validator = validator;
    }

    ngOnInit() {
        this.objectToSearch = '';
        this.offset=0; //first offset for objects retrieval
        this.limit=5;//Increment for offset (limit on query)
    }

    protected prev(){
        if(this.offset-this.limit>0)
            this.offset=this.offset-this.limit;
        else
            this.offset=0;
        console.log('Prev selected offset '+this.offset);
        this.search(false);
    }

    protected next(){
        console.log('Next selected offset '+this.offset);
        this.offset=this.offset+this.limit;
        this.search(false);
    }


    ngAfterViewInit() {
        /*setTimeout(() => {
            this.inputFocus.focus();
        }, 500);*/
    }


    public search(firstSearch:boolean ): void {
        this.isNextPossible();
        if(firstSearch)
            this.offset=0;
        // not empty
        if (this.objectToSearch) {
            this.objectToSearch = this.objectToSearch.trim();
            if (environment.DEBUG) {
                console.log('Searching ' + this.objectToSearch);
                console.log(this.validator.isIP(this.objectToSearch));
            }
            this._genericLoadBalancerService.search(this.objectToSearch,this.offset,this.limit).subscribe(
                response => {
                    this.success = response.virtuals.length > 0 || response.wideips.length > 0;
                    console.log('this.success ', this.success);

                    if(this.success) //if different to firstSearch then is coming from arrows, could be empty, so dont update
                    { 
                        this.virtuals = response.virtuals;
                        this.wideips = response.wideips;
                        if (environment.DEBUG) {
                            console.log('virtuals ', this.virtuals);
                            console.log('wideips ', this.wideips);
                        }
                    }
                },
                error => this._mainService.handlerError(error)
            );
        }
    }

    public isNextPossible(): boolean {
    if (this.objectToSearch) {
            this.objectToSearch = this.objectToSearch.trim();
            this._genericLoadBalancerService.search(this.objectToSearch,this.offset+this.limit,this.limit).subscribe(
                response => {
                    this.success = response.virtuals.length > 0 || response.wideips.length > 0;
                    console.log('Is next possible?'+this.success);
                },
                error => this._mainService.handlerError(error)
            );
        }

        return false;
    }

    public openChart(object: any, type: string): void {
        let objectArray: object[];
        objectArray = [];
        objectArray.push(object); //CanvasDialog is expecting array
        if ('v' === type || 'w' === type) {
            const config = new MatDialogConfig();
            config.viewContainerRef = this.viewContainerRef;
            this.dialogRef = this.dialog.open(CanvasDialogComponent, config);
            this.dialogRef.componentInstance.options = objectArray;
            this.dialogRef.componentInstance.type = type;
            this.dialogRef.afterClosed().subscribe(() => {
                this.dialogRef = null;
            });
        }
    }
}
