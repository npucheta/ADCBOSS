import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {MainService} from '../main.service';
import {LoadBalancerService} from './load-balancer.service';
import {
    DeviceComponent,
    NetscalerVirtualComponent,
    NetscalerServiceGroupComponent,
    NetscalerServiceComponent,
    NetscalerServerComponent,
    NetscalerMonitorComponent,
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
    PKIMetric,
    NetscalerPersistenceGroupComponent,
    LBComponent
} from '../../components/lb/objects';

@Injectable()
export class NetscalerService extends LoadBalancerService{

  
  
    protected Server = 'http://australtech.ddns.net/';
    protected ConfigApiUrl = 'rest/netscaler.php';
    protected ServerWithApiUrl = this.Server + this.ConfigApiUrl;
    protected ServerLBUrl = this.Server + 'rest/LB';
    protected DBcreated: boolean;

    constructor(protected http: Http, protected mainService: MainService) {
       super(http,mainService);
       this.createDB();
    }
     
protected createDB() {
        if (!this.DBcreated) {
            this.actionUrl = `${this.ServerWithApiUrl}/db_mgmt/netscaler/create/`;
            console.log(this.actionUrl);
            console.log(this.actionUrl);
            return this.http.get(this.actionUrl, this.options).subscribe(() => {
                    console.log('POST OK');
                    this.DBcreated = true;
                }, error => this.mainService.handlerError(error)
            );
        }
    }

public addDevice(hostname: string, username: string, password: string, getConfiguration: boolean, modules: string, vendor: string): void {
        this.actionUrl = `${this.ServerWithApiUrl}/netscalers/`;
        super.addDevice(hostname,username,password,getConfiguration,modules,vendor);
    }

    public Export(): Observable<Response> {
        this.actionUrl = `${this.ServerWithApiUrl}/export/netscaler/data`;
        console.log(this.actionUrl);
        return this.http.get(this.actionUrl, this.options).map(res => {
                return res;
            }, error => this.mainService.handlerError(error)
        );
    }

    public deleteDevice(device: String) {
        this.actionUrl = `${this.ServerWithApiUrl}/netscalers/hostname/${device}`;
        return super.deleteDevice(device);
    }

    public getDevicesAll(): Observable<DeviceComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/devices/netscalers/all`;
        return super.getElement();
    }

    public isDeviceAdded(device: String): Observable<boolean> {
        this.actionUrl = `${this.ServerWithApiUrl}/netscalers/hostname/${device}`;
        return super.isDeviceAdded(device);
    }

    public isConfigDumpCompleted(device: String): Observable<boolean> {
        this.actionUrl = `${this.ServerWithApiUrl}/netscalers/hostname/${device}`;
        return super.isConfigDumpCompleted(device);
    }
    
    public dumpConfig(device: String) {        
        this.actionUrl = `${this.ServerWithApiUrl}/configdump/netscalers/netscaler?hostname=${device}`;
        return super.dumpConfig(device);
    }

    public getVirtual(virtual: String, hostname: String): Observable<NetscalerVirtualComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/virtuals/name/${virtual}/?hostname=${hostname}`;
        return super.getSingleElement();
    }

    public getMonitor(monitor: String, hostname: String): Observable<NetscalerMonitorComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/monitors/monitorname/${monitor}/?hostname=${hostname}`;
        return super.getSingleElement();
    }
    public getMonitorsFromService(service: String, hostname: String): Observable<NetscalerMonitorComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/service_lbmonitor_relation/name/${service}/?hostname=${hostname}`;
        return super.getElement();    
    }
    public getMonitorsFromServiceGroup(servicegroupname: String, hostname: String): Observable<NetscalerMonitorComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/servicegroup_lbmonitor_relation/servicegroupname/${servicegroupname}/?hostname=${hostname}`;
        return super.getElement();    
    }
    public search(search: String): Observable<AppMapping> {
        this.actionUrl = `${this.ServerWithApiUrl}/search/string/${search}`;
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
    public getMonitors(hostname: String,offset:number){
        this.actionUrl = `${this.ServerWithApiUrl}/monitors/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
        return super.getElement();    
    }
    public searchMonitors(hostname: String,offset:number,search:String){
        this.actionUrl = `${this.ServerWithApiUrl}/monitors/monitorname/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();    
    }

    public getCSVirtual(virtual: String, hostname: String): Observable<NetscalerVirtualComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/csvirtuals/name/${virtual}/?hostname=${hostname}`;
        return super.getSingleElement();
    }

    public getCRVirtual(virtual: String, hostname: String): Observable<NetscalerVirtualComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/crvirtuals/name/${virtual}/?hostname=${hostname}`;
        return super.getSingleElement();
    }

    public getVirtuals(hostname: String,offset:number){
      this.actionUrl = `${this.ServerWithApiUrl}/virtuals/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
      return super.getElement();
    }
    public searchVirtualsByName(hostname: String,offset:number,search:String){
      this.actionUrl = `${this.ServerWithApiUrl}/virtuals/name/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
      return super.getElement();
    }
     public searchVirtualsByIP(hostname: String,offset:number,search:String){
      this.actionUrl = `${this.ServerWithApiUrl}/virtuals/ipv46/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
      return super.getElement();
    }

    public getCRPolicies(hostname: String,offset:number){
      this.actionUrl = `${this.ServerWithApiUrl}/crpolicies/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
      return super.getElement();
    }
    public searchCRPolicies(hostname: String,offset:number,search:String){
        this.actionUrl = `${this.ServerWithApiUrl}/crpolicies/policyname/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }
    public getCSPolicies(hostname: String,offset:number){
      this.actionUrl = `${this.ServerWithApiUrl}/cspolicies/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
      return super.getElement();
    }
    public searchCSPolicies(hostname: String,offset:number,search:String){
        this.actionUrl = `${this.ServerWithApiUrl}/cspolicies/policyname/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }
    public getCSActions(hostname: String,offset:number){
      this.actionUrl = `${this.ServerWithApiUrl}/csactions/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
      return super.getElement();
    }
    public searchCSActions(hostname: String,offset:number,search:String){
        this.actionUrl = `${this.ServerWithApiUrl}/csactions/name/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }
    public getCRPolicy(policy: String, hostname: String): Observable<NetscalerVirtualComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/crpolicies/policyname/${policy}/?hostname=${hostname}`;
        return super.getSingleElement();
    }
    public getCSPolicy(policy: String, hostname: String): Observable<NetscalerVirtualComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/cspolicies/policyname/${policy}/?hostname=${hostname}`;
        return super.getSingleElement();
    }
    public getCSAction(csaction: String, hostname: String): Observable<NetscalerVirtualComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/csactions/name/${csaction}/?hostname=${hostname}`;
        return super.getSingleElement();
    }
    public getCSVirtuals(hostname: String,offset:number){
      this.actionUrl = `${this.ServerWithApiUrl}/csvirtuals/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
      return super.getElement();    
    }
    public searchCSVirtuals(hostname: String,offset:number,search:String){
        this.actionUrl = `${this.ServerWithApiUrl}/csvirtuals/name/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();    
    }

    public getCRVirtuals(hostname: String,offset:number){
      this.actionUrl = `${this.ServerWithApiUrl}/crvirtuals/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
      return super.getElement();    
    }
    public searchCRVirtuals(hostname: String,offset:number,search:String){
      this.actionUrl = `${this.ServerWithApiUrl}/crvirtuals/name/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
      return super.getElement();    
    }
    public getServicegroups(hostname: String,offset:number){
      this.actionUrl = `${this.ServerWithApiUrl}/servicegroups/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
      return super.getElement();   
    }
    public searchServicegroups(hostname: String,offset:number,search:String){
        this.actionUrl = `${this.ServerWithApiUrl}/servicegroups/servicegroupname/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();   
    }
    public getServiceGroup(servicegroupname: String, hostname: String): Observable<NetscalerServiceGroupComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/servicegroups/servicegroupname/${servicegroupname}/?hostname=${hostname}`;
        return super.getSingleElement();
    }
    public getServices(hostname: String,offset:number){
      this.actionUrl = `${this.ServerWithApiUrl}/services/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
      return super.getElement();   
    }
    public searchServices(hostname: String,offset:number,search:String){
        this.actionUrl = `${this.ServerWithApiUrl}/services/name/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
         return super.getElement();   
    }

    public getService(service: String, hostname: String): Observable<NetscalerServiceComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/services/name/${service}/?hostname=${hostname}`;
        return super.getSingleElement();
    }

    public getServicesFromVirtual(virtual: String, hostname: String): Observable<NetscalerServiceComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/lbvserver_service_relation/virtualname/${virtual}`;
        return super.getSingleElement();
    }

    public getServiceGroupsFromVirtual(virtual: String, hostname: String): Observable<NetscalerServiceGroupComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/lbvserver_servicegroup_relation/virtualname/${virtual}`;
        return super.getSingleElement();
    }
    public getServersFromServiceGroup(servicegroupname: String, hostname: String): Observable<NetscalerServiceGroupComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/servicegroup_members_relation/servicegroupname/${servicegroupname}`;
        return super.getSingleElement();
    }
    
    public getPersistencegroups(hostname: String,offset:number){
      this.actionUrl = `${this.ServerWithApiUrl}/persistencegroups/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
      return super.getElement();  
    }

    public searchPersistencegroups(hostname: String,offset:number,search:String){
        this.actionUrl = `${this.ServerWithApiUrl}/persistencegroups/name/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();  
    }
    
    public getPersistenceGroup(persistencegroupname: String, hostname: String): Observable<NetscalerPersistenceGroupComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/persistencegroups/name/${persistencegroupname}/?hostname=${hostname}`;
        return super.getSingleElement();
    }
    public getProfiles(){
      this.actionUrl = `${this.ServerWithApiUrl}/profiles/`;
      return super.getElement();   
    }
    public getDBProfile(profile: String, hostname: String): Observable<NetscalerServerComponent> {
         this.actionUrl = `${this.ServerWithApiUrl}/dbprofiles/name/${profile}/?hostname=${hostname}`;
         return super.getSingleElement();   
    }
    public getNETProfile(profile: String, hostname: String): Observable<NetscalerServerComponent> {
         this.actionUrl = `${this.ServerWithApiUrl}/netprofiles/name/${profile}/?hostname=${hostname}`;
         return super.getSingleElement();   
    }

    public getTCPProfile(profile: String, hostname: String): Observable<NetscalerServerComponent> {
         this.actionUrl = `${this.ServerWithApiUrl}/tcpprofiles/name/${profile}/?hostname=${hostname}`;
         return super.getSingleElement();   
    }
    public getHTTPProfile(profile: String, hostname: String): Observable<NetscalerServerComponent> {
         this.actionUrl = `${this.ServerWithApiUrl}/httpprofiles/name/${profile}/?hostname=${hostname}`;
         return super.getSingleElement();   
    }
    public getSSLProfile(profile: String, hostname: String): Observable<NetscalerServerComponent> {
         this.actionUrl = `${this.ServerWithApiUrl}/sslprofiles/name/${profile}/?hostname=${hostname}`;
         return super.getSingleElement();   
    }
    public getSSLDTLSProfile(profile: String, hostname: String): Observable<NetscalerServerComponent> {
         this.actionUrl = `${this.ServerWithApiUrl}/ssldtlsprofiles/name/${profile}/?hostname=${hostname}`;
         return super.getSingleElement();   
    }

    public getServers(hostname: String,offset:number){
         this.actionUrl = `${this.ServerWithApiUrl}/servers/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
         return super.getElement();   
    }

    public searchServers(hostname: String,offset:number,search:String){
        this.actionUrl = `${this.ServerWithApiUrl}/servers/name/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();   
    }

    public getServer(server: String, hostname: String): Observable<NetscalerServerComponent> {
         this.actionUrl = `${this.ServerWithApiUrl}/servers/name/${server}/?hostname=${hostname}`;
         return super.getSingleElement();   
    }

    public isServiceGroup(element: String, hostname: String){
        console.log(element);
        return this.getServiceGroup(element,hostname).subscribe(res => {console.debug(res.servicegroupname);return(res==undefined)});
    }

    public isService(element: String, hostname: String){
        console.log(element);
        return this.getService(element,hostname).subscribe(res => {console.debug(res.name);return(res==undefined)});
    }

    public getTCPProfiles( hostname: String){
         this.actionUrl = `${this.ServerWithApiUrl}/tcpprofiles/`;
         return super.getElement();   
    }
    public getSSLProfiles( hostname: String){
         this.actionUrl = `${this.ServerWithApiUrl}/sslprofiles/`;
         return super.getElement();   
    }
    public getSSLDTLSProfiles( hostname: String){
         this.actionUrl = `${this.ServerWithApiUrl}/ssldtlsprofiles/`;
         return super.getElement();   
    }
    public getHTTPProfiles( hostname: String){
         this.actionUrl = `${this.ServerWithApiUrl}/httpprofiles/`;
         return super.getElement();   
    }
    public getDBProfiles( hostname: String){
         this.actionUrl = `${this.ServerWithApiUrl}/dbprofiles/`;
         return super.getElement();   
    }
      public getPKICPUMetric(metric: String, hostname: String): Observable<PKIMetric> {
        this.actionUrl = `${this.ServerWithApiUrl}/PKI/CPU/${metric}?hostname=${hostname}`;
        return super.getSingleElement();

    }

    public getPKIMEMMetric(metric: String, hostname: String): Observable<PKIMetric> {
        this.actionUrl = `${this.ServerWithApiUrl}/PKI/memory/${metric}?hostname=${hostname}`;
        return super.getSingleElement();

    }

    public getCertificate(cert: string, hostname: String): Observable<LBComponent> {
        let certEncoded = encodeURIComponent(cert);//Encode to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/certificates/certkey/${certEncoded}/?hostname=${hostname}`;
        return super.getSingleElement();
    }
}