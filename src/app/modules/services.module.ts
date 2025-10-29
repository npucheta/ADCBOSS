import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DevicesService} from '../services/lb/devices.service';
import {NetscalerService} from '../services/lb/netscaler.service';
import {RadwareService} from '../services/lb/radware.service';
import {CiscoCSSService} from '../services/lb/cisco-css.service';
import {AWSService} from '../services/lb/aws.service';
import {A10Service} from '../services/lb/a10.service';
import {GenericLoadBalancerService} from '../services/lb/generic-load-balancer.service';
import {GSLBService} from '../services/gslb/gslb.service';
import {MenuService} from '../services/menu.service';
import {MainService} from '../services/main.service';
import {ToastService} from '../services/toast.service';
import {AuthService} from '../services/auth.service';
import {AuthGuardService} from '../services/auth-guard.service';
import {DeviceFactoryService} from '../services/device-factory.service';
import {SharingDataService} from '../services/sharing-data.service';
import {TaskService} from '../services/task.service';
import {SystemService} from '../services/system.service'; 
import {UsersService} from '../services/users.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [
        DevicesService,
        NetscalerService,
        CiscoCSSService,
        RadwareService,
        AWSService,
        A10Service,
        GenericLoadBalancerService,
        GSLBService,
        DeviceFactoryService,
        MenuService,
        MainService,
        ToastService,
        AuthService,
        AuthGuardService,
        SharingDataService,
        TaskService,
        SystemService,
        UsersService
        
    ]
})
export class ServicesModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ServicesModule,
            providers: [
                DevicesService,
                NetscalerService,
                CiscoCSSService,
                RadwareService,
                AWSService,
                A10Service,
                GenericLoadBalancerService,
                GSLBService,
                DeviceFactoryService,
                MenuService,
                MainService,
                ToastService,
                AuthService,
                AuthGuardService,
                SharingDataService,
                TaskService,
                UsersService
            ]
        };
    }
}
