import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {DeviceComponent,
        RadwareVirtualServiceComponent,
        RadwareVirtualComponent,
        PKIMetric,
        RadwareRealServereComponent,
        LBComponent} from '../../components/lb/objects';
import {MainService} from '../main.service';
import {LoadBalancerService} from './load-balancer.service';


@Injectable()
export class RadwareService extends LoadBalancerService{

  
  
    protected Server = 'http://australtech.ddns.net/';
    protected ConfigApiUrl = 'rest/radware.php';
    protected ServerWithApiUrl = this.Server + this.ConfigApiUrl;
    protected ServerLBUrl = this.Server + 'rest/LB';
    protected DBcreated: boolean;

    constructor(protected http: Http, protected mainService: MainService) {
       super(http,mainService);
       this.createDB();
    }
     
protected createDB() {
        if (!this.DBcreated) {
            this.actionUrl = `${this.ServerWithApiUrl}/db_mgmt/radware/create/`;
            console.log(this.actionUrl);
            console.log(this.actionUrl);
            return this.http.get(this.actionUrl, this.options).subscribe(() => {
                    console.log('POST OK');
                    this.DBcreated = true;
                }, error => this.mainService.handlerError(error)
            );
        }
    }

    public getVirtualService(service: String, hostname: String): Observable<RadwareVirtualServiceComponent> {
         this.actionUrl = `${this.ServerWithApiUrl}/virtServices/ServIndex/${service}`;
        return super.getSingleElement();
    }

    public getServer(server: String, hostname: String): Observable<RadwareVirtualServiceComponent> {    
        this.actionUrl = `${this.ServerWithApiUrl}/realServers/Index/${server}`;
        return super.getSingleElement();
    }

    public getServerByIP(server: String, hostname: String): Observable<RadwareRealServereComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/realServers/IpAddr/${server}`;
        return super.getSingleElement();
    }

    public getServerGroup(servergroup: String, hostname: String): Observable<RadwareVirtualServiceComponent> {
         this.actionUrl = `${this.ServerWithApiUrl}/serverGroups/Index/${servergroup}`;
        return super.getSingleElement();
    }
    public getServersFromServerGroup(servergroup: String, hostname: String): Observable<RadwareVirtualServiceComponent> {
         this.actionUrl = `${this.ServerWithApiUrl}/groupRealServer/RealServGroupIndex/${servergroup}`;
        return super.getElement();
    }
    public getServersFromServices(servergroup: String, hostname: String): Observable<RadwareVirtualServiceComponent> {
         this.actionUrl = `${this.ServerWithApiUrl}/groupRealServer/RealServGroupIndex/${servergroup}`;
        return super.getElement();
    }
    public getServerGroupsFromServices(service: String, hostname: String): Observable<RadwareVirtualServiceComponent> {
         this.actionUrl = `${this.ServerWithApiUrl}/virtServicesSeventh/ServSeventhPartIndex/${service}`;
        return super.getSingleElement();
    }
    


    public getVirtualServicesFromVirtual (virtual: String,hostname:String): Observable<RadwareVirtualServiceComponent> {
         this.actionUrl = `${this.ServerWithApiUrl}/virtServicesSeventh/ServSeventhPartIndex/${virtual}`;
        return super.getElement();
    }
    
    public addDevice(hostname: string, username: string, password: string, getConfiguration: boolean, modules: string, vendor: string): void {
        this.actionUrl = `${this.ServerWithApiUrl}/radwares/`;
        super.addDevice(hostname,username,password,getConfiguration,modules,vendor);
    }

    public deleteDevice(device: String) {
        this.actionUrl = `${this.ServerWithApiUrl}/radwares/hostname/${device}`;
        return super.deleteDevice(device);
    }

    public getDevicesAll(): Observable<DeviceComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/devices/radwares/all`;
        return super.getElement();
    }

    public isDeviceAdded(device: String): Observable<boolean> {
        this.actionUrl = `${this.ServerWithApiUrl}/radwares/hostname/${device}`;
        return super.isDeviceAdded(device);
    }

    public isConfigDumpCompleted(device: String): Observable<boolean> {
        this.actionUrl = `${this.ServerWithApiUrl}/radwares/hostname/${device}`;
        return super.isConfigDumpCompleted(device);
    }

    public getVirtual(virtual: String, hostname: String): Observable<RadwareVirtualComponent> {
        //this.actionUrl = `${this.ServerWithApiUrl}/virtuals/VirtServerIndex/${virtual}/?hostname=${hostname}`;
        this.actionUrl = `${this.ServerWithApiUrl}/virtuals/VirtServerIndex/${virtual}`;
        return super.getSingleElement();
    }
    
    public dumpConfig(device: String) {        
        this.actionUrl = `${this.ServerWithApiUrl}/configdump/radwares/radware?hostname=${device}`;
        return super.dumpConfig(device);
    }

    public getVirtuals(hostname: String,offset:number){
        this.actionUrl = `${this.ServerWithApiUrl}/virtuals/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }


    public searchVirtualsByName(hostname: String,offset:number,search:String){
        this.actionUrl = `${this.ServerWithApiUrl}/virtuals/VirtServerIndex/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }
     public searchVirtualsByIP(hostname: String,offset:number,search:String){
        this.actionUrl = `${this.ServerWithApiUrl}/virtuals/VirtServerIpAddress/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }
    public getVirtualServices(hostname: String,offset:number){
        this.actionUrl = `${this.ServerWithApiUrl}/virtServices/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
        return super.getElement();
        
    }
    public searchVirtualServices(hostname: String,offset:number,search:String){
        this.actionUrl = `${this.ServerWithApiUrl}/virtServices/ServIndex/${hostname}?offset=${offset}&limit=${this.limit}`;
        return super.getElement();
        
    }
    public getServerGroups(hostname: String,offset:number){
        this.actionUrl = `${this.ServerWithApiUrl}/servergroups/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
        return super.getElement();
        
    }
    public searchServerGroups(hostname: String,offset:number,search:String){
        this.actionUrl = `${this.ServerWithApiUrl}/servergroups/Index/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
        
    }
    public getRealServers(hostname: String,offset:number){
        this.actionUrl = `${this.ServerWithApiUrl}/realservers/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
        return super.getElement();
        
    }
    public searchRealServers(hostname: String,offset:number,search:String){
        this.actionUrl = `${this.ServerWithApiUrl}/realservers/Index/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
        
    }


    public Export(): Observable<Response> {
        this.actionUrl = `${this.ServerWithApiUrl}/export/radware/data`;
        console.log(this.actionUrl);
        return this.http.get(this.actionUrl, this.options).map(res => {
                return res;
            }, error => this.mainService.handlerError(error)
        );
    }

    public getConfigFileInArchive(archive: string, configfile: String): Observable<String> {
        let archiveEncoded = encodeURIComponent(archive);//Encode wideip to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/archives/get_configfile_in_archive/${archiveEncoded}`;
        return this.getSingleElement();

    }

    public getCertificate(cert: string, hostname: String): Observable<LBComponent> {
        let certEncoded = encodeURIComponent(cert);//Encode to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/certificates/id/${certEncoded}/?hostname=${hostname}`;
        return super.getSingleElement();
    }
}