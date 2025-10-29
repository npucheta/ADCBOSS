import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {DeviceComponent,RadwareVirtualServiceComponent,RadwareVirtualComponent,PKIMetric} from '../../components/lb/objects';
import {MainService} from '../main.service';
import {LoadBalancerService} from './load-balancer.service';
import {
    VirtualComponent
} from '../../components/lb/objects';
@Injectable()
export class A10Service extends LoadBalancerService{
    protected Server = 'http://australtech.ddns.net/';
    protected ConfigApiUrl = 'rest/a10.php';
    protected ServerWithApiUrl = this.Server + this.ConfigApiUrl;
    protected ServerLBUrl = this.Server + 'rest/LB';
    protected DBcreated: boolean;

    constructor(protected http: Http, protected mainService: MainService) {
       super(http,mainService);
       this.createDB();
    }
     
    protected createDB() { 
        /*
        if (!this.DBcreated) {
            this.actionUrl = `${this.ServerWithApiUrl}/db_mgmt/a10/create/`;
            console.log(this.actionUrl);
            console.log(this.actionUrl);
            return this.http.get(this.actionUrl, this.options).subscribe(() => {
                    console.log('POST OK');
                    this.DBcreated = true;
                }, error => this.mainService.handlerError(error)
            );
        }*/
    }

    public addDevice(hostname: string, username: string, password: string, getConfiguration: boolean, modules: string, vendor: string): void {
        this.actionUrl = `${this.ServerWithApiUrl}/a10s/`;
        super.addDevice(hostname,username,password,getConfiguration,modules,vendor);
    }
    
    public dumpConfig(device: String) {        
        this.actionUrl = `${this.ServerWithApiUrl}/configdump/a10s/a10?hostname=${device}`;
        return super.dumpConfig(device);
    }

    public deleteDevice(device: String) {
        this.actionUrl = `${this.ServerWithApiUrl}/a10s/hostname/${device}`;
        return super.deleteDevice(device);
    }

    public getVirtualService(virtual: string, hostname: String): Observable<VirtualComponent> {
        let a10url = encodeURIComponent(virtual);
        this.actionUrl = `${this.ServerWithApiUrl}/virtualserverports/a10url/${a10url}/?hostname=${hostname}`;
        return super.getSingleElement();
    }

    public getVirtualServer(virtual: string, hostname: String): Observable<VirtualComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/virtuals/name/${virtual}/?hostname=${hostname}`;
        return super.getSingleElement();
    }

    public getServiceGroup(srvgroup: string, hostname: String): Observable<VirtualComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/servicegroups/name/${srvgroup}/?hostname=${hostname}`;
        return super.getSingleElement();
    }

    public getServersFromServiceGroup(srvgroup: string, hostname: String): Observable<VirtualComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/servicegroups_members/servicegroupname/${srvgroup}/?hostname=${hostname}`;
        return super.getSingleElement();
    }

    public getServer(server: string, hostname: String): Observable<VirtualComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/servers/host/${server}/?hostname=${hostname}`;
        return super.getSingleElement();
    }

    public getVirtualServicesFromHostname(hostname: String,offset:number): Observable<VirtualComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/virtualserverports/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
        return super.getElement();

    }
    public searchVirtualServicesFromHostname(hostname: String,offset:number,search:String): Observable<VirtualComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/virtualserverports/a10url/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
         return super.getElement();

    }
    public getVirtualServicesFromVirtual(virtual: String): Observable<VirtualComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/virtualserverports/virtualname/${virtual}`;
        return super.getElement();

    }
    public getVirtualServerFromHostname(hostname: String,offset:number): Observable<VirtualComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/virtuals/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
        return super.getElement();

    }

    public searchVirtualServerFromHostnameByName(hostname: String,offset:number,search:String): Observable<VirtualComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/virtuals/name/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;        
        return super.getElement();
    }

    public searchVirtualServerFromHostnameByIP(hostname: String,offset:number,search:String): Observable<VirtualComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/virtuals/ipaddress/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;        
        return super.getElement();
    }

    public getServicesGroupsFromHostname(hostname: String,offset:number): Observable<VirtualComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/servicegroups/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
        return super.getElement();

    }

    
    public searchServicesGroupsFromHostname(hostname: String,offset:number,search:String): Observable<VirtualComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/servicegroups/name/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();

    }

    public getServersFromHostname(hostname: String,offset:number): Observable<VirtualComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/servers/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
        return super.getElement();

    }
    public searchServersFromHostname(hostname: String,offset:number,search:String): Observable<VirtualComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/servers/host/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }

    public getMonitorsFromHostname(hostname: String): Observable<VirtualComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/monitors/hostname/${hostname}`;
        return super.getElement();

    }
}