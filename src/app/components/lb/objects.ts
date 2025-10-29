import {GSLBTuple} from '../gslb/GSLBobjects';

export class DeviceComponent {
    hostname: string;
    config_status: string;
    STATISTIC_CPU_INFO_FIVE_SEC_AVG_USAGE_RATIO: Number;
    STATISTIC_MEMORY_PERCENTAGE: Number;
    DeviceState: string;
    modules: string;
    vendor: string;
}

export class VirtualComponent {
    public virtual: String;
    public ip: String;
    public port: String;
    public pool: String;
    public availability_status: String;
    public enabled_status: String;
}

export class NetscalerVirtualComponent {
    public virtual: String;
    public ip: String;
    public port: String;
    public pool: String;
    public availability_status: String;
    public enabled_status: String;
}

export class VirtualStatComponent {
    public virtual: String;
    public ip: String;
    public port: String;
    public availability: String;
    public statistic_type: String;
    public timestamp_current: String;
    public counter_high_current: Number;
    public counter_low_current: Number;
}
export class LBComponent {

}

export class Pool {
    public pool_name: String;
    public pool_members: String[];
    constructor() { }
}
export class Virtual {
    public virtual_id: String;
    public ip: String;
    public netmask: String;
    public port: String;
    public protocol: String;
    public type: String;
    public pool: Pool;
    constructor() { }
}

export class Task {
    public id: String;
    public owner: String;
    public creation_time: String;
    public execution_time: String;
    public state: String;
    public type: String;
    public destination_vendor: String;
    public source_vendor: String;
    public destination_hostname: String;
    public source_hostname: String;
    public depends_on: String;
    public virtual: Virtual;

    public log_file: String;
}

export class User {
    public user: String;
    public password: String;
    public role: String;
    public authentication: String;
    public shell_access: String;
    public locked_out: String;
    public failed_logins: String;
}
export class NetscalerComponent {

}

export class NetscalerProfileComponent {

}

export class AWSRuleComponent {

}

export class AWSTargetComponent {

}

export class AWSTargetGroupComponent {

}

export class AWSActionComponent {

}

export class AWSZoneComponent {

}

export class AWSListenerComponent {

}

export class AWSLoadBalancerComponent {

}

export class RadwareServerComponent {

}

export class RadwareServerGroupComponent {

}

export class RadwareVirtualComponent {

}

export class RadwareVirtualServiceComponent {

}
export class RadwareRealServereComponent {
    IpAddr: string;
    Index: string;

}
export class NetscalerMonitorComponent {

}

export class NetscalerVirtualServiceComponent {

}

export class NetscalerServiceGroupComponent {
    public servicegroupname: String;
}

export class NetscalerServiceComponent {
    public name: String;
}

export class NetscalerPersistenceGroupComponent {

}

export class NetscalerServerComponent {

}

export class ProfileComponent {
    profile: String;
}

export class HTTPProfileComponent {
    profile: String;
}

export class ClientSSLProfileComponent {
    profile: String;
}

export class ServerSSLProfileComponent {
    profile: String;
}

export class FastL4ProfileComponent {
    profile: String;
}

export class PersistenceProfileComponent {
    profile: String;
}

export class FTPProfileComponent {
    profile: String;
}

export class HTTPClassComponent {
    profile: String;
}

export class OneConnectProfileComponent {
    profile: String;
}

export class StreamProfileComponent {
    profile: String;
}

export class TCPProfileComponent {
    profile: String;
}

export class UDPProfileComponent {
    profile: String;
}

export class OtherProfileComponent {
    profile: String;
}

export class iRuleComponent { // TODO change to standard camelCase
    irule_name: String;
}

export class PoolComponent extends LBComponent {
    pool: String;
}

export class NodeComponent {
    hostname: String;
    ip: String;
    availability_status: String;
    enabled_status: String;
    status_description: String;
    ratio: String;
}

export class PoolMemberComponent {
    node: String;
}

export class MonitorComponent {
    monitor: String;
}

export class SNATPoolComponent {
    SNAT: string;
}

export class CertComponent {
    cert: string;
}

export class LBTuple {
    hostname: string;
    virtual: string;
    ip: string;
    port: string;
    pool: String[][]; // TODO create object <T>
    snat_type: string;
    snatpool: string;
}

export class VIPStatus {
    reason: string;
    hostnames: string;
    virtuals: string;
    ips: string;
    protocols: string;
    source_target: string;
    description: string;
    availability: string;
    enabled_disabled: string;
    description_status: string;
}

export class AppMapping {
    wideips: GSLBTuple[];
    virtuals: LBTuple[];
}

export class PKIMetric {
    metric: string;
    value: Number;
    state: string;
}
