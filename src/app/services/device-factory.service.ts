import {Injectable} from '@angular/core';
import {DevicesService} from './lb/devices.service';
import {CiscoCSSService} from './lb/cisco-css.service';
import {AWSService} from './lb//aws.service';
import {RadwareService} from './lb/radware.service';
import {GenericLoadBalancerService} from './lb/generic-load-balancer.service';
import {NetscalerService} from './lb/netscaler.service';
import {GSLBService} from './gslb/gslb.service';
import {A10Service} from './lb/a10.service';
import {A10VirtualDetailComponent} from '../components/lb/a10-objects-detail/a10-virtual-detail/a10-virtual-detail.component';
import {A10VirtualServiceDetailComponent} from '../components/lb/a10-objects-detail/a10-virtual-service-detail/a10-virtual-service-detail.component'; 
import {A10ServiceGroupDetailComponent} from '../components/lb/a10-objects-detail/a10-service-group-detail/a10-service-group-detail.component';
import {A10ServersDetailComponent} from '../components/lb/a10-objects-detail/a10-servers-detail/a10-servers-detail.component';
import {DeviceComponent} from '../components/lb/objects';
import {VirtualDetailComponent} from '../components/lb/f5-objects-detail/virtual-detail/virtual-detail.component';
import {NetscalerVirtualDetailComponent} from '../components/lb/netscaler-objects-detail/netscaler-virtual-detail/netscaler-virtual-detail.component';
import {NetscalerCRVirtualDetailComponent} from '../components/lb/netscaler-objects-detail/netscaler-crvirtual-detail/netscaler-crvirtual-detail.component';
import {NetscalerCSVirtualDetailComponent} from '../components/lb/netscaler-objects-detail/netscaler-csvirtual-detail/netscaler-csvirtual-detail.component';
import {NetscalerServerDetailComponent} from '../components/lb/netscaler-objects-detail/netscaler-server-detail/netscaler-server-detail.component';
import {NetscalerServicesDetailComponent} from '../components/lb/netscaler-objects-detail/netscaler-services-detail/netscaler-services-detail.component';
import {NetscalerServicegroupsDetailComponent} from '../components/lb/netscaler-objects-detail/netscaler-servicegroups-detail/netscaler-servicegroups-detail.component';
import {RadwareVirtualDetailComponent} from '../components/lb/radware-objects-detail/radware-virtual-detail/radware-virtual-detail.component';
import {RadwareServergroupsDetailComponent} from '../components/lb/radware-objects-detail/radware-servergroups-detail/radware-servergroups-detail.component';
import {RadwareRealserversDetailComponent} from '../components/lb/radware-objects-detail/radware-realservers-detail/radware-realservers-detail.component';
import {AWSListenerDetailComponent} from '../components/lb/aws-objects-detail/awslistener-detail/awslistener-detail.component';
import {AWSListenerv1DetailComponent} from '../components/lb/aws-objects-detail/awslistenerv1-detail/awslistenerv1-detail.component';
import {AWStargetDetailComponent} from '../components/lb/aws-objects-detail/awstarget-detail/awstarget-detail.component';
import {AWStargetgroupDetailComponent} from '../components/lb/aws-objects-detail/awstargetgroup-detail/awstargetgroup-detail.component';
import {PoolDetailComponent} from '../components/lb/f5-objects-detail/pool-detail/pool-detail.component';
import {NodeDetailComponent} from '../components/lb/f5-objects-detail/node-detail/node-detail.component';
import {CertificateDetailComponent} from '../components/lb/certificate-detail/certificate-detail.component';
import {KeyDetailComponent} from '../components/lb/key-detail/key-detail.component';

@Injectable()
export class DeviceFactoryService {
    public deviceTypes: Array<any> = [
        {value: 'F5 BIG-IP', realvalue: 'F5'},
        {value: 'CITRIX Netscaler', realvalue: 'netscaler'},
        {value: 'Radware Alteon', realvalue: 'radware'},
        {value: 'Cisco CSS', realvalue: 'CSS'},
        {value: 'AWS ELB', realvalue: 'ELB'}
    ];

    constructor(private devicesService: DevicesService,
                private gslbdevicesService: GSLBService,
                private netscalerService: NetscalerService,
                private ciscoCSSService: CiscoCSSService,
                private radwareService: RadwareService,
                private awsService: AWSService,
                private a10Service: A10Service,
                private genericLoadBalancer: GenericLoadBalancerService) {
    }

    public returnSpecificServiceFromVendor(device: DeviceComponent) {
        let vendor = device.vendor;
        let modules = device.modules;
        if (vendor.includes('CSS') || vendor.includes('cisco-css')) return this.ciscoCSSService;
        if ((vendor.includes('F5') || vendor.includes('f5')) && modules.includes('GTM')) return this.gslbdevicesService;
        if ((vendor.includes('F5') || vendor.includes('f5')) && modules.includes('LTM')) return this.devicesService;
        if (vendor.includes('Netscaler') || vendor.includes('citrix-netscaler')) return this.netscalerService;
        if (vendor.includes('Radware') || vendor.includes('radware-alteon')) return this.radwareService; 
        if (vendor.includes('ELB')|| vendor.includes('aws-elb')) return this.awsService;
        if (vendor.includes('a10')|| vendor.includes('A10')) return this.a10Service;

    }

    public returnSpecificServiceFromVendorOnly(vendor: string) {
        if(vendor)
        {
            if (vendor.includes('CSS') || vendor.includes('cisco-css')) return this.ciscoCSSService;
            if ((vendor.includes('F5') || vendor.includes('f5'))) return this.gslbdevicesService;
            if ((vendor.includes('F5') || vendor.includes('f5'))) return this.devicesService;
            if (vendor.includes('Netscaler') || vendor.includes('citrix-netscaler')) return this.netscalerService;
            if (vendor.includes('Radware') || vendor.includes('radware-alteon')) return this.radwareService; 
            if (vendor.includes('ELB')|| vendor.includes('aws-elb')) return this.awsService;
            if (vendor.includes('a10')|| vendor.includes('A10')) return this.a10Service;
        }
        return this.devicesService; //TODO fix for certs without vendor
    }

    public returnSpecificServiceForF5(deviceType:string){
       if (deviceType.includes('GTM')) return this.gslbdevicesService;
       if (deviceType.includes('LTM')) return this.devicesService;

    }

    public returnSpecificService(device: DeviceComponent) {
        return this.returnSpecificServiceFromVendor(device);
    }

    public returnArchiveLocation(device: DeviceComponent) {
        if (device.vendor.includes('LTM') || device.vendor.includes('F5') || device.vendor.includes('GTM')) 
            return 'BIGIP';
        else
            return device.vendor;
    }

    public returnVirtualComponent(vendor: String, type: String) {
        let componentType;
        switch (vendor) {
            case ('A10'):
                componentType = A10VirtualServiceDetailComponent;
                break;
            case ('aws-elb'):
            case ('ELBv2'):
                componentType = AWSListenerDetailComponent;
                break;
            case ('ELBv1'):
                componentType = AWSListenerv1DetailComponent;
                break;
            case ('Radware'):
                componentType = RadwareVirtualDetailComponent;
                break;
            case ('Netscaler'): {
                if (type === 'STANDARDVS')
                    componentType = NetscalerVirtualDetailComponent;
                if (type === 'CRVS')
                    componentType = NetscalerCRVirtualDetailComponent;
                if (type === 'CSVS')
                    componentType = NetscalerCSVirtualDetailComponent;
            }
                break;
            default: //default is F5
                componentType = VirtualDetailComponent;
                break;
        }
        return componentType;
    }

    public returnPoolComponent(vendor: String, type: String) {
        let componentType;
        switch (vendor) {
            case ('A10'):
                componentType = A10ServiceGroupDetailComponent;
                break;
            case ('aws-elb'):
            case ('ELBv2'):
                componentType = AWStargetgroupDetailComponent;
                break;
            case ('Radware'):
                componentType = RadwareServergroupsDetailComponent;
                break;
            case ('Netscaler'): {
                if (type === 'SERVICE') {
                    componentType = NetscalerServicesDetailComponent;
                }
                if (type === 'SERVICEGROUP') {
                    componentType = NetscalerServicegroupsDetailComponent;
                }
            }
                break;
            default:
                componentType = PoolDetailComponent;
                break;
        }
        return componentType;
    }

    public returnNodeComponent(vendor: String, type: String) {
        let componentType;
        switch (vendor) {
            case ('A10'):
                componentType = A10ServersDetailComponent;
                break;
            case ('aws-elb'):
            case ('ELBv2'):
            case ('AWS'):
                componentType = AWStargetDetailComponent;
                break;
            case ('Radware'):
                componentType = RadwareRealserversDetailComponent;
                break;
            case ('Netscaler'):
                componentType = NetscalerServerDetailComponent;
                break;
            default:
                componentType = NodeDetailComponent;
                break;
        }

        return componentType;
    }

   /* public returnCertificateComponent(vendor: String, type: String) {
        return CertificateDetailComponent;
    }
    
    public returnKeyComponent(vendor: String, type: String) {
        return KeyDetailComponent;
    }*/
}
