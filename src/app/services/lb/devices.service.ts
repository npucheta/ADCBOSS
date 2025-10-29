import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {
    DeviceComponent,
    VirtualComponent,
    ProfileComponent,
    iRuleComponent,
    PoolComponent,
    NodeComponent,
    PoolMemberComponent,
    MonitorComponent,
    SNATPoolComponent,
    CertComponent,
    HTTPProfileComponent,
    LBTuple,
    VirtualStatComponent,
    VIPStatus,
    AppMapping,
    PKIMetric
} from '../../components/lb/objects';
import {MainService} from '../main.service';
import {LoadBalancerService} from './load-balancer.service';


@Injectable()
export class DevicesService extends LoadBalancerService{

    
    constructor(protected http: Http, protected mainService: MainService) 
    {
        super(http,mainService);
        this.ConfigApiUrl = 'rest/bigip.php';
        this.ServerWithApiUrl = this.Server + this.ConfigApiUrl;
        this.ServerLBUrl = this.Server + 'rest/LB';
        this.createDB();
        this.createDBGTM();    
    }


    private createDB() {
        if (!this.DBcreated) {
            this.actionUrl = `${this.ServerWithApiUrl}/db_mgmt/ltm/create/`;
            console.log(this.actionUrl);
            return this.http.get(this.actionUrl, this.options).subscribe(() => {
                    console.log('POST OK');
                    this.DBcreated = true;
                }, error => this.mainService.handlerError(error)
            );
        }
    }

    private createDBGTM() {
        this.actionUrl = `${this.ServerWithApiUrl}/db_mgmt/gtm/create/`;
        console.log(this.actionUrl);
        return this.http.get(this.actionUrl, this.options).subscribe(() => {
                console.log('POST OK');
                this.DBcreated = true;
            }, error => this.mainService.handlerError(error)
        );
    }

    public getDevicesAll(): Observable<DeviceComponent[]> {
        this.createDB();
        this.actionUrl = `${this.ServerWithApiUrl}/devices/bigips/all`;
        return super.getElement();
    }

    public getDevices(): Observable<DeviceComponent[]> {
        this.createDB();
        this.actionUrl = `${this.ServerWithApiUrl}/bigips/`;
        return super.getElement();
    }



    public getDevice(hostname: String): Observable<DeviceComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/bigips/hostname/${hostname}`;
         return super.getSingleElement();
    }

    public getVirtual(virtual: string, hostname: String): Observable<VirtualComponent> {
        let virtualEncoded = encodeURIComponent(virtual);//Encode virtual to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/virtuals/virtual/${virtualEncoded}/?hostname=${hostname}`;
        return super.getSingleElement();
    }

    public getVirtualFromPool(pool: string, hostname: String): Observable<VirtualComponent> {
        let encodedPool = encodeURIComponent(pool);//Encode to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/virtuals/pool/${encodedPool}/?hostname=${hostname}`;
        return super.getSingleElement();

    }

    public getProfile(actionUrl: string): Observable<ProfileComponent> {
        this.actionUrl=actionUrl;
        console.log(actionUrl);
        return super.getSingleElement();

    }

    public getProfiles(actionUrl: string): Observable<ProfileComponent[]> {
        this.actionUrl=actionUrl;
        console.log(actionUrl);
        return super.getElement();

    }

    public getVSFromHostname(hostname: String,offset:Number): Observable<VirtualComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/virtuals/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
        return super.getElement();

    }

    public SearchVSFromHostnameByIP(hostname: String,offset:Number,search:String): Observable<VirtualComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/virtuals/ip/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();

    }

    public SearchVSFromHostnameByName(hostname: String,offset:Number,search:String): Observable<VirtualComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/virtuals/virtual/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();

    }

    public GetVirtualStats(device: String): Observable<VirtualStatComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/virtuals/hostname/${device}`;
        return super.getElement();

    }

    public searchVirtuals(search: String): Observable<VirtualComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/virtuals/virtual/${search}?search=true`;
         return super.getElement();
    }

    public searchVirtualsbyIP(ip: String): Observable<VirtualComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/virtuals/ip/${ip}?search=true`;
        return super.getElement();
    }

    public getHTTPProfiles(hostname: String): Observable<ProfileComponent[]> {
        return this.getProfiles(`${this.ServerWithApiUrl}/http_profiles/hostname/${hostname}`);
    }

    public getHTTPProfile(profile: string, hostname: String): Observable<HTTPProfileComponent> {
        let encodedProfile= encodeURIComponent(profile);//Encode to workaround partitions slashes
        return this.getProfile(`${this.ServerWithApiUrl}/http_profiles/profile/${encodedProfile}/?hostname=${hostname}`);
    }

    public getHTTPProfileFromVirtual(virtual: string, hostname: String): Observable<HTTPProfileComponent> {
        let encodedVirtual= encodeURIComponent(virtual);//Encode to workaround partitions slashes
        return this.getProfile(`${this.ServerWithApiUrl}/virtual_http_profile_relation/virtual/${encodedVirtual}/?hostname=${hostname}`);
    }

    public getTCPProfiles(hostname: String): Observable<ProfileComponent[]> {
        return this.getProfiles(`${this.ServerWithApiUrl}/tcp_profiles/hostname/${hostname}`);
    }

    public getTCPProfile(profile: string, hostname: String): Observable<ProfileComponent> {
                let encodedProfile= encodeURIComponent(profile);//Encode to workaround partitions slashes
        return this.getProfile(`${this.ServerWithApiUrl}/tcp_profiles/profile/${encodedProfile}/?hostname=${hostname}`);
    }

    public getTCPProfileFromVirtual(virtual: String, hostname: String): Observable<ProfileComponent> {
        return this.getProfile(`${this.ServerWithApiUrl}/virtual_tcp_profile_relation/virtual/${virtual}/?hostname='${hostname}`);
    }

    public getUDPProfiles(hostname: String): Observable<ProfileComponent[]> {
        return this.getProfiles(`${this.ServerWithApiUrl}/udp_profiles/hostname/${hostname}`);
    }

    public getUDPProfile(profile: string, hostname: String): Observable<ProfileComponent> {
        let encodedProfile= encodeURIComponent(profile);//Encode to workaround partitions slashes
        return this.getProfile(`${this.ServerWithApiUrl}/udp_profiles/profile/${encodedProfile}/?hostname=${hostname}`);
    }

    public getUDPProfileFromVirtual(profile: string, hostname: String): Observable<ProfileComponent> {
        let encodedProfile= encodeURIComponent(profile);//Encode to workaround partitions slashes
        return this.getProfile(`${this.ServerWithApiUrl}/virtual_udp_profile_relation/profile/${encodedProfile}/?hostname=${hostname}`);
    }

    public getFastL4Profiles(hostname: String): Observable<ProfileComponent[]> {
        return this.getProfiles(`${this.ServerWithApiUrl}/fastL4_profiles/hostname/${hostname}`);
    }
        
    public getFastL4ProfileFromVirtual(profile: string, hostname: String): Observable<ProfileComponent> {
        let encodedProfile= encodeURIComponent(profile);//Encode to workaround partitions slashes
        return this.getProfile(`${this.ServerWithApiUrl}/virtual_fastl4_profile_relation/profile/${encodedProfile}/?hostname=${hostname}`);
    }

    public getPersistenceProfiles(hostname: String): Observable<ProfileComponent[]> {
        return this.getProfiles(`${this.ServerWithApiUrl}/persistence_profiles/hostname/${hostname}`);
    }

    public getPersistenceProfile(profile: string, hostname: String): Observable<ProfileComponent> {
        let encodedProfile= encodeURIComponent(profile);//Encode to workaround partitions slashes
        return this.getProfile(`${this.ServerWithApiUrl}/persistence_profiles/profile/${encodedProfile}/?hostname=${hostname}`);
    }

    public getStreamProfiles(hostname: String): Observable<ProfileComponent[]> {
        return this.getProfiles(`${this.ServerWithApiUrl}/stream_profiles/hostname/${hostname}`);
    }

    public getStreamProfile(profile: string, hostname: String): Observable<ProfileComponent> {
        let encodedProfile= encodeURIComponent(profile);//Encode to workaround partitions slashes
        return this.getProfile(`${this.ServerWithApiUrl}/stream_profiles/profile/${encodedProfile}/?hostname=${hostname}`);
    }

    public getStreamProfileFromVirtual(profile: string, hostname: String): Observable<ProfileComponent> {
        let encodedProfile= encodeURIComponent(profile);//Encode to workaround partitions slashes
        return this.getProfile(`${this.ServerWithApiUrl}/virtual_stream_profile_relation/profile/${encodedProfile}/?hostname=${hostname}`);
    }

    public getOneConnectProfiles(hostname: String): Observable<ProfileComponent[]> {
        return this.getProfiles(`${this.ServerWithApiUrl}/oneconnect_profiles/hostname/${hostname}`);
    }

    public getOneConnectProfile(profile: string, hostname: String): Observable<ProfileComponent> {
        let encodedProfile= encodeURIComponent(profile);//Encode to workaround partitions slashes
        return this.getProfile(`${this.ServerWithApiUrl}/oneconnect_profiles/profile/${encodedProfile}/?hostname=${hostname}`);
    }

    public getOneConnectProfileFromVirtual(profile: string, hostname: String): Observable<ProfileComponent> {
        let encodedProfile= encodeURIComponent(profile);//Encode to workaround partitions slashes
        return this.getProfile(`${this.ServerWithApiUrl}/virtual_oneconnect_profile_relation/profile/${encodedProfile}/?hostname=${hostname}`);
    }

    public getFastL4Profile(profile: string, hostname: String): Observable<ProfileComponent> {
        let encodedProfile= encodeURIComponent(profile);//Encode to workaround partitions slashes
        return this.getProfile(`${this.ServerWithApiUrl}/fastL4_profiles/profile/${encodedProfile}/?hostname=${hostname}`);
    }

    public getClientSSLProfiles(hostname: String): Observable<ProfileComponent[]> {
        return this.getProfiles(`${this.ServerWithApiUrl}/clientssl_profiles/hostname/${hostname}`);
    }

    public getClientSSLProfile(profile: string, hostname: String): Observable<ProfileComponent> {
        let encodedProfile= encodeURIComponent(profile);//Encode to workaround partitions slashes
        return this.getProfile(`${this.ServerWithApiUrl}/clientssl_profiles/profile/${encodedProfile}/?hostname=${hostname}`);
    }

    public getClientSSLProfileFromVirtual(profile: string, hostname: String): Observable<ProfileComponent> {
        let encodedProfile= encodeURIComponent(profile);//Encode to workaround partitions slashes
        return this.getProfile(`${this.ServerWithApiUrl}/virtual_clientssl_profile_relation/profile/${encodedProfile}/?hostname=${hostname}`);
    }

    public getServerSSLProfiles(hostname: String): Observable<ProfileComponent[]> {
        return this.getProfiles(`${this.ServerWithApiUrl}/serverssl_profiles/hostname/${hostname}`);
    }

    public getServerSSLProfile(profile: string, hostname: String): Observable<ProfileComponent> {
        let encodedProfile= encodeURIComponent(profile);//Encode to workaround partitions slashes
        return this.getProfile(`${this.ServerWithApiUrl}/serverssl_profiles/profile/${encodedProfile}/?hostname=${hostname}`);
    }

    public getServerSSLProfileFromVirtual(profile: string, hostname: String): Observable<ProfileComponent> {
        let encodedProfile= encodeURIComponent(profile);//Encode to workaround partitions slashes
        return this.getProfile(`${this.ServerWithApiUrl}/virtual_serverssl_profile_relation/profile/${encodedProfile}/?hostname=${hostname}`);
    }

    public getFTTPProfiles(hostname: String): Observable<ProfileComponent[]> {
        return this.getProfiles(`${this.ServerWithApiUrl}/ftp_profiles/hostname/${hostname}`);
    }

    public getFTTPProfile(profile: string, hostname: String): Observable<ProfileComponent> {
        let encodedProfile= encodeURIComponent(profile);//Encode to workaround partitions slashes
        return this.getProfile(`${this.ServerWithApiUrl}/ftp_profiles/profile/${encodedProfile}/?hostname=${hostname}`);
    }

    public getFTPProfileFromVirtual(profile: string, hostname: String): Observable<ProfileComponent> {
        let encodedProfile= encodeURIComponent(profile);//Encode to workaround partitions slashes
        return this.getProfile(`${this.ServerWithApiUrl}/virtual_ftp_profile_relation/profile/${encodedProfile}/?hostname=${hostname}`);
    }

    public getHTTPClasses(hostname: String): Observable<ProfileComponent[]> {
        return this.getProfiles(`${this.ServerWithApiUrl}/httpclass_profiles/hostname/${hostname}`);
    }

    public getHTTPClasse(profile: string, hostname: String): Observable<ProfileComponent> {
        let encodedProfile= encodeURIComponent(profile);//Encode to workaround partitions slashes
        return this.getProfile(`${this.ServerWithApiUrl}/httpclass_profiles/profile/${encodedProfile}/?hostname=${hostname}`);
    }

    public getHTTPClassFromVirtual(profile: string, hostname: String): Observable<ProfileComponent> {
        let encodedProfile= encodeURIComponent(profile);//Encode to workaround partitions slashes
        return this.getProfile(`${this.ServerWithApiUrl}/virtual_httpclass_profile_relation/profile/${encodedProfile}/?hostname=${hostname}`);
    }

    public getiRulesFromHostname(hostname: String,offset:number): Observable<iRuleComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/irules/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }

    public searchiRulesFromHostname(hostname: String,offset:Number,search:String): Observable<iRuleComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/irules/irule_name/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }

    public getiRules(offset:number): Observable<iRuleComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/irules/?offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }

    public searchiRules(offset:number,search:String): Observable<iRuleComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/irules/irule_name/${search}?search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }

    public getiRule(irule: string, hostname: String): Observable<iRuleComponent> {
        let iruleEncoded = encodeURIComponent(irule);//Encode pool to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/irules/irule_name/${iruleEncoded}/?hostname=${hostname}`;
        return super.getSingleElement();

    }

    public getPoolsFromHostname(hostname: String,offset:number): Observable<PoolComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/pools/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }

    public searchPoolsFromHostname(hostname: String,offset:number,search:String): Observable<PoolComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/pools/pool/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }

    public getPool(pool: string, hostname: String): Observable<PoolComponent> {
        let poolEncoded = encodeURIComponent(pool);//Encode pool to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/pools/pool/${poolEncoded}/?hostname=${hostname}`;
        return super.getSingleElement();
    }

    public compareVIPs(source: String, target: String): Observable<VIPStatus[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/vipstatuscomparison/${source}/${target}/`;
         return super.getElement();

    }

    public search(search: string): Observable<AppMapping> {
        let encodedSearch= encodeURIComponent(search);//Encode to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/search/string/${encodedSearch}`;
        return super.getSingleElement();
    }



    public searchTupleByString(search: String): Observable<LBTuple[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/search/string/${search}`;
                return super.getElement();
    }

    public searchTupleByIP(search: String): Observable<LBTuple[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/search/ip/${search}`;
                return super.getElement();

    }
    /*
    public searchPools(search: String): Observable<PoolComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/pools/pool/${search}?search=true`;
                return super.getElement();

    }*/

    public searchPoolMembers(ip: String): Observable<PoolMemberComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/members/ip/${ip}?search=true`;
                return super.getElement();

    }

    public getNodesFromHostname(hostname: String,offset:number): Observable<NodeComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/nodes/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
                return super.getElement();

    }

    public searchNodesFromHostname(hostname: String,offset:number,search:String): Observable<NodeComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/nodes/ip/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
                return super.getElement();

    }

    public getNode(ip: string, hostname: String): Observable<NodeComponent> {
        let ipEncoded = encodeURIComponent(ip);//Encode pool to workaround partitions slashes   
        this.actionUrl = `${this.ServerWithApiUrl}/nodes/ip/${ipEncoded}/?hostname=${hostname}`;
                return super.getSingleElement();

    }

    public getPoolMember(pool: string, hostname: String): Observable<PoolMemberComponent> {
        let poolEncoded = encodeURIComponent(pool);//Encode pool to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/members/pool/${poolEncoded}/?hostname=${hostname}`;
        return super.getSingleElement();

    }

    /*
    public getPoolMembersFromVirtual(virtual: String, hostname: String): Observable<PoolMemberComponent> {
        // const members: Observable<PoolMemberComponent>;
        this.actionUrl = `${this.ServerWithApiUrl}/members_from_virtual/virtual/${virtual}/?hostname=${hostname}`;
        return super.getSingleElement();

    }*/

    public getMonitorsFromHostname(hostname: String,offset:number): Observable<MonitorComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/monitors/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
        return super.getElement();

    }

    public searchMonitorsFromHostname(hostname: String,offset:number,search:String): Observable<MonitorComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/monitors/monitor_name/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();

    }

    public getMonitors(): Observable<MonitorComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/monitors/hostname/`;
        return super.getElement();

    }

    public getMonitor(monitor: string, hostname: String): Observable<MonitorComponent> {
        let monitorEncoded = encodeURIComponent(monitor);//Encode pool to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/monitors/monitor_name/${monitorEncoded}/?hostname=${hostname}`;
        return super.getSingleElement();

    }

    public getMonitorsFromPool(pool: string, hostname: String): Observable<MonitorComponent> {
        let poolEncoded = encodeURIComponent(pool);//Encode pool to workaround partitions slashes    
        this.actionUrl = `${this.ServerWithApiUrl}/pool_monitor_relation/pool/${poolEncoded}/?hostname=${hostname}`;
        return super.getSingleElement();

    }

    public getSNATPoolsFromHostname(hostname: String,offset:number): Observable<SNATPoolComponent[]> {
        
        this.actionUrl = `${this.ServerWithApiUrl}/snatpools/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
        return super.getElement();

    }

    public searchSNATPoolsFromHostname(hostname: String,offset:number,search:String): Observable<SNATPoolComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/snatpools/snatpool/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();

    }

    public getSNATPools(): Observable<SNATPoolComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/snatpools/hostname/`;
        return super.getElement();

    }

    public Export(): Observable<Response> {
        this.actionUrl = `${this.ServerWithApiUrl}/export/ltm/data`;
        console.log(this.actionUrl);
        return this.http.get(this.actionUrl, this.options).map(res => {
                return res;
            }, error => this.mainService.handlerError(error)
        );
    }

    public getSNATPool(snatpool: string, hostname: String): Observable<SNATPoolComponent> {
        let snatpoolEncoded = encodeURIComponent(snatpool);//Encode pool to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/snatpools/snatpool/${snatpoolEncoded}/?hostname=${hostname}`;
        return super.getSingleElement();

    }

    public addDevice(hostname: string, username: string, password: string, getConfiguration: boolean, modules: string): void {
        this.createDB(); // if DB not created, then create
        this.actionUrl = `${this.ServerWithApiUrl}/bigips/`;
        const data = new URLSearchParams();
        data.append('hostname', hostname);
        data.append('username', username);
        data.append('password', password);
        //data.append('modules', modules);
        data.append('modules', 'TMOS_MODULE_LTM');

        data.append('get_configuration', getConfiguration ? getConfiguration.toString() : 'false');

        this.http.post(this.actionUrl, data, this.options).subscribe(() => {
                // this.mainService.handlerSuccess(toast);
                // return true;
                console.log('POST OK');
            }, error => this.mainService.handlerError(error, true)
        );

        // return false;
    }

    public markDeviceAsTarget(hostname: String) {
        this.actionUrl = `${this.ServerWithApiUrl}/bigips/hostname/${hostname}`;
        console.log(this.actionUrl);
        const data = new URLSearchParams();
        data.append('is_target_for_migration', 'true');
        this.http.put(this.actionUrl, data, this.options).subscribe(() => {
                console.log('POST OK');
            }, error => this.mainService.handlerError(error)
        );
    }

    public resetMigrationFlags(hostname: String) {
        this.actionUrl = `${this.ServerWithApiUrl}/bigips/hostname/${hostname}`;
        console.log(this.actionUrl);
        const data = new URLSearchParams();
        data.append('is_target_for_migration', 'false');
        data.append('is_source_for_migration', 'false');
        this.http.put(this.actionUrl, data, this.options).subscribe(() => {
                console.log('POST OK');
            }, error => this.mainService.handlerError(error)
        );
    }

    public markDeviceAsSource(hostname: String) {
        this.actionUrl = `${this.ServerWithApiUrl}/bigips/hostname/${hostname}`;
        console.log(this.actionUrl);
        const data = new URLSearchParams();
        data.append('is_source_for_migration', 'true');
        this.http.put(this.actionUrl, data, this.options).subscribe(() => {
                console.log('POST OK');
            }, error => this.mainService.handlerError(error)
        );
    }

    public migrateConfig() {
        this.actionUrl = `${this.ServerWithApiUrl}/configload/bigips/ltm`;
        console.log(this.actionUrl);
        return this.http.get(this.actionUrl, this.options).subscribe(() => {
                console.log('POST OK');
            }, error => this.mainService.handlerError(error)
        );
    }

    public ARPMGMT(hostname: String, enable_or_disabled: String) {
        this.actionUrl = `${this.ServerWithApiUrl}/arpmgmt/bigips/${enable_or_disabled}?hostname=${hostname}`;
        console.log(this.actionUrl);
        return this.http.get(this.actionUrl, this.options).subscribe(() => {
                console.log('POST OK');
            }, error => this.mainService.handlerError(error)
        );
    }

    public ObjectCleanUp(hostname: String, object_type: String) {
        this.actionUrl = `${this.ServerWithApiUrl}/cleanup/bigips/${object_type}?hostname=${hostname}`;
        console.log(this.actionUrl);
        return this.http.get(this.actionUrl, this.options).subscribe(() => {
                console.log('POST OK');
            }, error => this.mainService.handlerError(error)
        );
    }

    public RefreshStats(hostname: String) {
        this.actionUrl = `${this.ServerWithApiUrl}/statistics/bigips/dump/ltm?hostname=${hostname}`;
        console.log(this.actionUrl);
        return this.http.get(this.actionUrl, this.options).subscribe(() => {
                console.log('POST OK');
            }, error => this.mainService.handlerError(error)
        );
    }

    public isDeviceAdded(device: String): Observable<boolean> {
        this.actionUrl = `${this.ServerWithApiUrl}/bigips/hostname/${device}`;
        return super.isDeviceAdded(device);
    }

    public isConfigurationMigrated(device: String): Observable<boolean> {
        this.actionUrl = `${this.ServerWithApiUrl}/bigips/hostname/${device}`;
        console.log(this.actionUrl);
        return this.http.get(this.actionUrl, this.options).map(data => {
                console.log('POST OK');
                console.log(data.json()[0].config_status);
                if ('Configuration Migrated' === data.json()[0].config_status) {
                    console.log('IF OK');
                    return true;
                } else {
                    console.log('IF FAILED');
                    return false;
                }
            }, error => this.mainService.handlerError(error)
        );
    }

    public isConfigDumpCompleted(device: String): Observable<boolean> {
        this.actionUrl = `${this.ServerWithApiUrl}/bigips/hostname/${device}`;
        return super.isConfigDumpCompleted(device);
    }

    public dumpConfig(device: String) {        
        this.actionUrl = `${this.ServerWithApiUrl}/configdump/bigips/ltm?hostname=${device}`;
        return super.dumpConfig(device);
    }

    public deleteDevice(device: String) {
        this.actionUrl = `${this.ServerWithApiUrl}/bigips/hostname/${device}`;
        return super.deleteDevice(device);
    }
}
