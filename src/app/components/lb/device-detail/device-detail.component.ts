import {Component, Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {channels, environment, isForMe} from '../../../shared/common';
import {SharingDataService} from '../../../services/sharing-data.service';
import {ChannelService} from '../../../services/channel.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSidenav} from '@angular/material';
// TODO convert to service

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})

export class DeviceDetailComponent implements OnInit, OnDestroy {
    // sharing data service
    protected actionSubscription: Subscription;
    protected data: ChannelService;
    protected offset: number;
    protected limit: number;  //Increment for offset (limit on query)
    protected objectSelected: string;
    protected options: object[];
    protected defaultOption = 'device';
    protected busy: Subscription;
    protected readonly SELF_CHANNEL; // this should be unique
    protected OPTIONS_DEVICE: object[];
    protected search: String;
    protected comesfromsearch:boolean;
    protected isIPaddressFlag:boolean;
    protected objectKeys;

    public changeOption(option):void {}
    constructor(protected router: Router,
                protected dialog: MatDialog,
                protected viewContainerRef: ViewContainerRef,
                protected sharingDataService: SharingDataService)
                {
                  this.offset=0; //first offset for objects retrieval
                  this.limit=5;//Increment for offset (limit on query)
                  this.objectSelected = this.defaultOption; // TODO replace it with sharingDataService
                }      
                
    protected SearchItem (): boolean {
        console.log ('Searching '+this.search);
        this.isIPaddressFlag=false;
        this.comesfromsearch=true;
        if(this.isIPaddress(this.search))
            this.isIPaddressFlag=true;

        this.offset=0; //first offset for objects retrieval
        this.changeOption(this.objectSelected);
        return true;
    }

    protected isIPaddress(ipaddress) {  
    //if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\./.test(ipaddress)) {  
        return (true)  
    }  
    return (false)  
    }
  
    protected prev(){
        if(this.offset-this.limit>0)
            this.offset=this.offset-this.limit;
        else
            this.offset=0;
        console.log('Prev selected for '+this.objectSelected+' offset '+this.offset);
        this.changeOption(this.objectSelected); //Refresh view
    }

    protected next(){
        console.log('Next selected for '+this.objectSelected+' offset '+this.offset);
        this.offset=this.offset+this.limit;
        this.changeOption(this.objectSelected); //Refresh view
    }
 

    ngOnInit(): void {
        this.objectKeys = Object.keys;
        this.options = this.OPTIONS_DEVICE;
        this.changeOption(this.objectSelected);
        this.offset=0; //first offset for objects retrieval

        // listening
        this.actionSubscription = this.sharingDataService.dataSource$
            .subscribe(data => {
                if (isForMe(this.SELF_CHANNEL, data.to)) {
                    if (environment.DEBUG) {
                        console.log('from init F5 action ==>', data);
                    }
                    this.data = data;
                    switch (this.data.info[0]) {
                        case 'close-modal':
                            this.closeModal();
                            break;
                    }
                }
            });
        //
    }

    reset(init?: boolean): void {
        if (init) {
            this.objectSelected = this.defaultOption; // TODO replace it with sharingDataService
        }
    }

    ngOnDestroy(): void {
        this.busy = null;
        this.dialog.closeAll();
        this.actionSubscription.unsubscribe();
    }
    // fix issue overlap modal
    public closeModal() {
        this.dialog.closeAll();
    }


}
