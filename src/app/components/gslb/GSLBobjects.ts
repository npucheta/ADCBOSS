export class WideIPComponent {
    wideip: String;
    public counter_high_current: Number;
    public counter_low_current: Number;
}
export class iRuleComponent { // TODO change to standard camelCase
    irule_name: String;
}
export class PoolComponent {
    pool: String;
}
export class DatacenterComponent {
    datacenter: String;
}
export class ServerComponent {
    server: String;
}
export class VirtualServerComponent {
    virtualserver: String;
}
export class MonitorComponent {
    monitor_name: String;
}
export class TopologyComponent {
    topology: String;
}

export class GSLBTuple {
    sync_group: string;
    hostname: string;
    wideip: string;
    pools: String[];
    server: string;
    datacenter: string;
    product: string;
}
