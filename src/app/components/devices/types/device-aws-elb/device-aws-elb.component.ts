import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TypeDeviceInterface} from '../../../../interfaces/type-device.interface';
import {DevicesComponent} from '../../devices.component';
import {Subscription} from 'rxjs/Subscription';
import {ChannelService} from '../../../../services/channel.service';
import {channels, environment, isForMe} from '../../../../shared/common';
import {SharingDataService} from '../../../../services/sharing-data.service';
import {AWSService} from '../../../../services/lb/aws.service';

@Component({
    selector: 'app-device-aws-elb',
    templateUrl: './device-aws-elb.component.html',
    styles: []
})
export class DeviceAwsELBComponent implements TypeDeviceInterface, OnInit, AfterViewInit, OnDestroy {

    form: FormGroup;
    aws_access_key_id: string;
    aws_secret_access_key: string;
    getConfiguration: boolean;

    @Input()
    title: string;
    @Input()
    parent: DevicesComponent;
    @Input()
    deviceType: string;
    actionSubscription: Subscription;
    data: ChannelService;
    readonly SELF_CHANNEL = channels.CHANNEL_FOR_APP_DEVICE_AWS_ELB; // this should be unique

    constructor(private _cd: ChangeDetectorRef, public sharingDataService: SharingDataService,public awsService:AWSService) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            deviceTypes: new FormControl(),
            aws_access_key_id: new FormControl(),
            aws_secret_access_key: new FormControl(),
            getConfiguration: new FormControl(true),
            isLB: new FormControl(true),
            isGSLB: new FormControl(),
            username: new FormControl(),
            password: new FormControl(),
            dataCenter: new FormControl()
        });

        this.actionSubscription = this.sharingDataService.dataSource$
            .subscribe(data => {
                if (isForMe(this.SELF_CHANNEL, data.to)) {
                    if (environment.DEBUG) {
                        console.log('from init AWS action ==>', data);
                    }
                    this.data = data;
                    switch (this.data.info[0]) {
                        case 'save':
                            this.save();
                            break;
                        case 'reset':
                            this.reset();
                            break;
                    }
                }
            });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.parent.title = this.title;
        }, 200);
        this.getConfiguration = true;
        this._cd.detectChanges();
    }

    public ngOnDestroy(): void {
        this.actionSubscription.unsubscribe();
    }

    public save() {
        if (environment.DEBUG) {
            console.log('save from child');
            console.log(this.aws_access_key_id);
            console.log(this.aws_secret_access_key);
            console.log(this.deviceType);
            
        }

        this.parent.loadbalancerService = this.awsService;
        this.parent.wait = true;
        //this.parent.loadbalancerService.addDevice(this.aws_access_key_id, this.aws_secret_access_key, this.getConfiguration, this.deviceType);
        this.parent.loadbalancerService.addDevice(this.aws_access_key_id, this.aws_access_key_id, this.aws_secret_access_key, this.getConfiguration, this.deviceType,this.deviceType);
        
        if (this.getConfiguration) {
            this.parent.loopCheckDeviceAdded(this.aws_access_key_id).then(() => {
                this.parent.toast.showSuccess(); // TODO make directive or add to addDevice
                this.reset();
                this.parent.wait = false; // TODO make directive or add to addDevice
            });
        } else {
            this.parent.wait = false;
            this.parent.toast.showError(); // TODO make directive or add to addDevice
        }

        this.parent.getDevices();
    }

    public reset() {
        this.form.reset({
            getConfiguration: new FormControl(true),
            isLB: new FormControl(true)
        });
    }
}
