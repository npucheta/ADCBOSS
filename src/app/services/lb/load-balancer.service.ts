import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {MainService} from '../main.service';
import {
    AppMapping,
    DeviceComponent,
    LBTuple,
    NodeComponent,
    PoolComponent,
    VirtualComponent,
    LBComponent,
    PKIMetric
} from '../../components/lb/objects';
import {environment} from "../../shared/common";
import {HttpService} from '../http.service';

@Injectable()
export class LoadBalancerService extends HttpService{  // Parent interface for all load balancer types
    protected actionUrl: string;
    protected headers: Headers;
    protected options: RequestOptions;
    protected Server: string;
    protected ConfigApiUrl: string;
    protected ServerWithApiUrl : string;
    protected ServerLBUrl : string;
    protected DBcreated: boolean;
    protected limit:number;
    netscalerVirtuals: VirtualComponent[];
    f5virtuals: VirtualComponent[];
    virtuals: VirtualComponent[];

    constructor(protected http: Http,
                protected mainService: MainService) {
       super(http,mainService);
        this.DBcreated = false;
        this.Server = 'http://australtech.ddns.net/';
        this.ConfigApiUrl = 'rest/GenericLoadBalancer.php';
        this.ServerWithApiUrl = this.Server + this.ConfigApiUrl;
        this.ServerLBUrl = this.Server + 'rest/LB';
        this.limit=5; //smount of objects to retrieve per call
    }


    public deleteDevice(device: String) {
        // this.actionUrl = `${this.ServerWithApiUrl}/bigips/hostname/${device}`;
        console.log(this.actionUrl);
        return this.http.delete(this.actionUrl, this.options).subscribe(() => {
                console.log('POST OK');
            }, error => this.mainService.handlerError(error)
        );
    }


    public getPKIState(hostname: String): Observable<PKIMetric> {
      this.actionUrl = `${this.ServerWithApiUrl}/PKI/state/HA?hostname=${hostname}`;
      return super.getSingleElement();

    }

    public getPKICPUMetric(metric: String, hostname: String): Observable<PKIMetric> {
        this.actionUrl = `${this.ServerWithApiUrl}/PKI/CPU/${metric}?hostname=${hostname}`;
        return super.getSingleElement();

    }

    public getPKIMEMMetric(metric: String, hostname: String): Observable<PKIMetric> {
        this.actionUrl = `${this.ServerWithApiUrl}/PKI/memory/${metric}?hostname=${hostname}`;
        return super.getSingleElement();

    }

    public addDevice(hostname: string, username: string, password: string, getConfiguration: boolean, modules: string, vendor: string): void {
        // this.createDB(); // if DB not created, then create
        // this.actionUrl = `${this.ServerWithApiUrl}/netscalers/`;
        const data = new URLSearchParams();
        data.append('hostname', hostname);
        data.append('username', username);
        data.append('password', password);
        data.append('modules', modules);
        data.append('vendor', vendor);
        if(getConfiguration)
            data.append('get_configuration', 'true');
        else
            data.append('get_configuration', 'false');

        this.http.post(this.actionUrl, data, this.options).subscribe(() => {
                // this.mainService.handlerSuccess(toast);
                // return true;
                if (environment.DEBUG) {
                    console.log('POST OK');
                }
            }, error => this.mainService.handlerError(error, true)
        );

        // return false;
    }

    public isDeviceAdded(device: String): Observable<boolean> {
        // this.actionUrl = `${this.ServerWithApiUrl}/bigips/hostname/${device}`;
        console.log(this.actionUrl);
        return this.http.get(this.actionUrl, this.options).map(data => {
                console.log('POST OK');
                console.log(data.json()[0].hostname);
                if (data.json()[0].hostname === device) {
                    console.log('ADDED OK');
                    return true;
                } else {
                    console.log('ADD FAILED');
                    return false;
                }
            }, error => this.mainService.handlerError(error)
        );
    }

    public dumpConfig(device: String) {
        // this.actionUrl = `${this.ServerWithApiUrl}/configdump/bigips/ltm?hostname=${device}`;
        console.log(this.actionUrl);
        return this.http.get(this.actionUrl, this.options).subscribe(() => {
                console.log('POST OK');
            }, error => this.mainService.handlerError(error)
        );
    }

    public isConfigurationMigrated(device: String): Observable<boolean> {
        // this.actionUrl = `${this.ServerWithApiUrl}/bigips/hostname/${device}`;
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
        // this.actionUrl = `${this.ServerWithApiUrl}/bigips/hostname/${device}`;
        console.log(this.actionUrl);
        return this.http.get(this.actionUrl, this.options).map(data => {
                console.log('POST OK');
                console.log(data.json()[0].config_status);
                if ('Virtual Servers updated' === data.json()[0].config_status) {
                    console.log('IF OK');
                    return true;
                } else {
                    console.log('IF FAILED');
                    return false;
                }
            }, error => this.mainService.handlerError(error)
        );
    }

    public getPools(offset:number): Observable<PoolComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/pools?offset=${offset}&limit=${this.limit}`;
        return this.getElement();
    }
    public searchPools(offset:number,search:String): Observable<PoolComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/pools/pool/${search}?search=true&offset=${offset}&limit=${this.limit}`;
        return this.getElement();
    }

    public getCertificates(offset:number): Observable<LBComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/certificates?offset=${offset}&limit=${this.limit}`;
        return this.getElement();
    }
    public searchCertificates(offset:number,search:String): Observable<LBComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/certificates/file_name/${search}?search=true&offset=${offset}&limit=${this.limit}`;
        return this.getElement();
    }

     public getCertsFromHostname(hostname: String,offset:number): Observable<LBComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/certificates?hostname=${hostname}?offset=${offset}&limit=${this.limit}`;
        return this.getElement();
    }

     public searchCertsFromHostname(hostname: String,offset:number,search:String): Observable<LBComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/certificates/file_name/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return this.getElement();
    }
    

     public getKeys(): Observable<LBComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/keys`;
        return this.getElement();
    }

    public getCertificate(cert: string, hostname: String): Observable<LBComponent> {
        let certEncoded = encodeURIComponent(cert);//Encode to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/certificates/file_name/${certEncoded}/?hostname=${hostname}`;
        return super.getSingleElement();
    }
    public getKey(key: string, hostname: String): Observable<LBComponent> {
        let keyEncoded = encodeURIComponent(key);//Encode to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/keys/file_name/${keyEncoded}/?hostname=${hostname}`;
        return super.getSingleElement();
    }

    public getVS(offset:number): Observable<VirtualComponent[]> { // Get Virtual Server from all Load Balancer
        this.actionUrl = `${this.ServerWithApiUrl}/virtuals?offset=${offset}&limit=${this.limit}`;
        return this.getElement();
    }
    public searchVSByName(offset:number,search:String): Observable<VirtualComponent[]> { // Get Virtual Server from all Load Balancer
        this.actionUrl = `${this.ServerWithApiUrl}/virtuals/virtual/${search}?search=true&offset=${offset}&limit=${this.limit}`;
        return this.getElement();
    }
    public searchVSByIP(offset:number,search:String): Observable<VirtualComponent[]> { // Get Virtual Server from all Load Balancer
        this.actionUrl = `${this.ServerWithApiUrl}/virtuals/ip/${search}?search=true&offset=${offset}&limit=${this.limit}`;
        return this.getElement();
    }

    public getNodes(offset:number): Observable<NodeComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/nodes?offset=${offset}&limit=${this.limit}`;
        return this.getElement();
    }
    public searchNodes(offset:number,search:String): Observable<NodeComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/nodes/ip/${search}?search=true&offset=${offset}&limit=${this.limit}`;
        return this.getElement();
    }

    public search(search: String,offset:number,limit:number): Observable<AppMapping> {
        this.actionUrl = `${this.ServerWithApiUrl}/search/string/${search}?offset=${offset}&limit=${this.limit}`
        return this.getSingleElement();
    }

    public appMappingIPPort(ip: string, port: String, hostname: String): Observable<AppMapping> {
        let dataEncoded = encodeURIComponent(ip);//Encode to workaround partitions slashes

        this.actionUrl = `${this.ServerWithApiUrl}/appmapping/${dataEncoded}/${port}?hostname=${hostname}`;
        return super.getSingleElement();
    }
    public appMappingString(search: string, hostname: String): Observable<AppMapping> {
        let searchEncoded = encodeURIComponent(search);//Encode to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/search/string/${searchEncoded}?hostname=${hostname}`;
        return super.getSingleElement();
    }

    public searchTupleByString(search: String): Observable<LBTuple[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/search/string/${search}`;
        return this.getElement();
    }

    public searchTupleByIP(search: String): Observable<LBTuple[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/search/ip/${search}`;
        return this.getElement();

    }

    public listFilesFromArchive(filename: String): Observable<String[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/archives/list_files_in_archive/${filename}`;
        return this.getSingleElement();

    }

    public listArchives(): Observable<String[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/archives/list_archives`;
        return this.getElement();

    }

    public listArchivesHostname(device: DeviceComponent): Observable<String[]> {
        const hostname = device.hostname;
        this.actionUrl = `${this.ServerWithApiUrl}/archives/file/list_archives?hostname=${hostname}`;
        return this.getElement();
    }

    public getConfigFileInArchive(archive: String, configfile: String): Observable<String> {
        const archiveEncoded = encodeURIComponent(archive + '/' + configfile); // Encode wideip to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/archives/get_configfile_in_archive/${archiveEncoded}`;
        return this.getSingleElement();

    }

    public createArchive(device: DeviceComponent): void {
        const hostname = device.hostname;
        this.actionUrl = `${this.ServerWithApiUrl}/archives/file/create?hostname=${hostname}`;
        console.log(this.actionUrl);
        this.http.get(this.actionUrl, this.options).subscribe(() => {
                // TODO
            }, error => this.mainService.handlerError(error)
        );
    }
}
