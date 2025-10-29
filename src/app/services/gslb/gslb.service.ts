import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {
    WideIPComponent,
    iRuleComponent,
    PoolComponent,
    DatacenterComponent,
    ServerComponent,
    MonitorComponent,
    TopologyComponent,
    VirtualServerComponent,
    GSLBTuple
} from '../../components/gslb/GSLBobjects';
import {URLSearchParams} from '@angular/http';
import {DeviceComponent} from '../../components/lb/objects';
import {MainService} from '../main.service';
import {LoadBalancerService} from '../lb/load-balancer.service';

@Injectable()
export class GSLBService extends LoadBalancerService{
    protected Server = 'http://australtech.ddns.net/';
    protected ApiUrl = 'rest/bigip.php';
    protected ServerWithApiUrl = this.Server + this.ApiUrl;

     constructor(protected http: Http, 
                 protected mainService: MainService
                ) {
       super(http,mainService);
       
    }

    private createDB() {
        if (!this.DBcreated) {
            this.actionUrl = `${this.ServerWithApiUrl}/db_mgmt/gtm/create/`;
            console.log(this.actionUrl);
            return this.http.get(this.actionUrl, this.options).subscribe(() => {
                    console.log('POST OK');
                    this.DBcreated = true;
                }, error => this.mainService.handlerError(error)
            );
        }
    }


    public Export(): Observable<Response> {
        this.actionUrl = `${this.ServerWithApiUrl}/export/gtm/data`;
        console.log(this.actionUrl);
        return this.http.get(this.actionUrl, this.options).map(res => {
                return res;
            }, error => this.mainService.handlerError(error)
        );
    }

    public getDevices(): Observable<DeviceComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_bigips/`;
        return super.getElement();
    }

    public getDevice(hostname: String): Observable<DeviceComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_bigips/hostname/${hostname}`;
        return super.getSingleElement();
    }

    public RefreshStats(hostname: String) {
        this.actionUrl = `${this.ServerWithApiUrl}/statistics/bigips/dump/gtm?hostname=${hostname}`;
        return super.getSingleElement();
    }

    public getWideIPsFromHostname(hostname: String,offset:Number): Observable<WideIPComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_wideip?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }
    public getWideIPs(offset:Number): Observable<WideIPComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_wideip?offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }

    public getWideip(wideip: string): Observable<WideIPComponent> {
        let wideipEncoded = encodeURIComponent(wideip);//Encode wideip to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_wideip/wideip/${wideipEncoded}`;
        return super.getSingleElement();
    }

    public getiRule(irule: string): Observable<iRuleComponent> {
        let iruleEncoded = encodeURIComponent(irule);//Encode wideip to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_irules/irule_name/${iruleEncoded}`;
        return super.getSingleElement();
    }

    public getPool(pool: string): Observable<PoolComponent> {
        let poolEncoded = encodeURIComponent(pool);//Encode wideip to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_pool/pool/${poolEncoded}`;
        return super.getSingleElement();
    }

    public getServer(server: string): Observable<ServerComponent> {
        let serverEncoded = encodeURIComponent(server);//Encode wideip to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_server/server/${serverEncoded}`;
        return super.getSingleElement();
    }

    public getMonitor(monitor: string): Observable<MonitorComponent> {
        let monitorEncoded = encodeURIComponent(monitor);//Encode wideip to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_monitor/monitor_name/${monitorEncoded}`;
        return super.getSingleElement();
    }

    public getTopology(topology: string): Observable<TopologyComponent> {
        let topologyEncoded = encodeURIComponent(topology);//Encode wideip to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_topology/topology/${topologyEncoded}`;
        return super.getSingleElement();
    }

    public getDatacenter(datacenter: string): Observable<DatacenterComponent> {
        let datacenterEncoded = encodeURIComponent(datacenter);//Encode wideip to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_datacenter/datacenter/${datacenterEncoded}`;
        return super.getSingleElement();
    }

    public getiRules(offset:Number): Observable<iRuleComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_irules?search=true&offset=${offset}&limit=${this.limit}`;
        return super.getSingleElement();
    }

    public getiRulesFromHostname(hostname: String,offset:Number): Observable<iRuleComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_irules?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getSingleElement();
    }
    public searchiRulesFromHostname(hostname: String,offset:Number,search:String): Observable<iRuleComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_irules/irule_name/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getSingleElement();
    }

    public getGSLBPoolsFromHostname(hostname: String,offset:Number): Observable<PoolComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_pool?hostname=${hostname}&offset=${offset}&limit=${this.limit}`;
        return super.getSingleElement();
    }

    public getGSLBPools(offset:Number): Observable<PoolComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_pool?offset=${offset}&limit=${this.limit}`;
        return super.getSingleElement();
    }

    public searchGSLBPoolsFromHostname(hostname: String,offset:Number,search:String): Observable<PoolComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_pool?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getSingleElement();
    }
    public searchGSLBPools(offset:Number,search:String): Observable<PoolComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_pool?search=true&offset=${offset}&limit=${this.limit}`;
        return super.getSingleElement();
    }
    
    public getPoolsFromWideIP(wideip: string): Observable<PoolComponent[]> {
        let wideipEncoded = encodeURIComponent(wideip);//Encode wideip to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_wideip_pool_relation/wideip/${wideipEncoded}`;
        return super.getElement();

    }

    public getDatacentersFromHostname(hostname: String,offset:Number): Observable<DatacenterComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_datacenter/datacenter?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }

    public getDatacenters(offset:Number): Observable<DatacenterComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_datacenter/datacenter?search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }

    public searchDatacentersFromHostname(hostname: String,offset:Number,search:String): Observable<DatacenterComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_datacenter/datacenter/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }

    public searchServers(offset:Number,search:String): Observable<ServerComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_server/server/${search}?search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }
    public getServers(offset:Number): Observable<ServerComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_server/server?search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }

    public searchServersFromHostname(hostname: String,offset:Number,search:String): Observable<ServerComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_server/server/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }

    public getServersFromHostname(hostname: String,offset:Number): Observable<ServerComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_server?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }

    public getServersFromDatacenter(datacenter: string): Observable<ServerComponent[]> {
        let datacenterEncoded = encodeURIComponent(datacenter);//Encode wideip to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_server/datacenter/${datacenterEncoded}`;
        return super.getElement();
    }

    public getVirtualServersFromServers(server: string): Observable<VirtualServerComponent[]> {
        let serverEncoded = encodeURIComponent(server);//Encode wideip to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_server_virtual_server_relation/server/${serverEncoded}`;
        return super.getElement();
    }

    public getVirtualServer(virtualserver: string): Observable<VirtualServerComponent> {
        let vsEncoded = encodeURIComponent(virtualserver);//Encode wideip to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_virtual_server/name/${vsEncoded}`;
        return super.getSingleElement();
    }

    public getVirtualServersFromPool(pool: string): Observable<VirtualServerComponent> {
        let poolEncoded = encodeURIComponent(pool);//Encode wideip to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_pool_virtual_server_relation/pool/${poolEncoded}`;
        return super.getSingleElement();
    }

    public getMonitorsFromHostname(hostname: String,offset:Number): Observable<MonitorComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_monitor?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }
    public getMonitors(offset:Number): Observable<MonitorComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_monitor?search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }
    public searchMonitorsFromHostname(hostname: String,offset:Number,search:String): Observable<MonitorComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_monitor/monitor_name/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }

    public getTopologiesFromHostname(hostname: String,offset:Number): Observable<TopologyComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_topology_record?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getSingleElement();
    }
    public getTopologies(offset:Number): Observable<TopologyComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_topology_record?search=true&offset=${offset}&limit=${this.limit}`;
        return super.getSingleElement();
    }
    public searchTopologiesFromHostname(hostname: String,offset:Number,search:String): Observable<TopologyComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_topology/server_type/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getSingleElement();
    }
    public searchVirtuals(search: String): Observable<VirtualServerComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_pool_virtual_server_relation/member_name/${search}?search=true`;
        return super.getElement();
    }

    public searchVirtualsByIP(search: String): Observable<VirtualServerComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_pool_virtual_server_relation/member_address/${search}?search=true`;
        return super.getElement();
    }

    public searchWideIPsFromHostname(hostname: String,offset:Number,search:String): Observable<WideIPComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_wideip/wideip/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;       
        return super.getElement();
    }
    public searchWideIPs(offset:Number,search:String): Observable<WideIPComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_wideip/wideip/${search}?search=true&offset=${offset}&limit=${this.limit}`;       
        return super.getElement();
    }

    public searchGSLBTupleByString(search: String): Observable<GSLBTuple[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslbsearch/string/${search}`;
        return super.getElement();
    }

    public searchGSLBTupleByIP(search: String): Observable<GSLBTuple[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/gslbsearch/ip/${search}`;
        return super.getElement();
    }

    public addDevice(hostname: string, username: string, password: string, getConfiguration: boolean): void {
        this.createDB(); // if DB not created, then create

        this.actionUrl = `${this.ServerWithApiUrl}/gslb_bigips/`;
        const data = new URLSearchParams();
        data.append('hostname', hostname);
        data.append('username', username);
        data.append('password', password);
        data.append('modules', 'TMOS_MODULE_GTM');
        data.append('vendor', 'F5');
        data.append('get_configuration', getConfiguration.toString());

        this.http.post(this.actionUrl, data, this.options).subscribe(() => {// TODO add config dump if true (async)
                // this.mainService.handlerSuccess(toast);
                // return true;
                console.log('POST OK');
            }, error => this.mainService.handlerError(error)
        );
        // return false;
    }

    public deleteDevice(device: String) {
        this.actionUrl = `${this.ServerWithApiUrl}/gslb_bigips/hostname/${device}`;
        console.log(this.actionUrl);
        return this.http.delete(this.actionUrl, this.options).subscribe(() => {
                console.log('POST OK');
            }, error => this.mainService.handlerError(error)
        );
    }

    public dumpConfig(device: String) {
        this.actionUrl = `${this.ServerWithApiUrl}/configdump/bigips/gtm?hostname=${device}`;
        console.log(this.actionUrl);
        return this.http.get(this.actionUrl, this.options).subscribe(() => {
                console.log('POST OK');
            }, error => this.mainService.handlerError(error)
        );
    }
}
