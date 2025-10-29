import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {DeviceComponent,
        AWSLoadBalancerComponent,
        AWSActionComponent,
        AWSListenerComponent,
        AWSTargetComponent,
        AWSTargetGroupComponent,
        AWSZoneComponent,
        AWSRuleComponent,
        LBComponent} from '../../components/lb/objects';
import {MainService} from '../main.service';
import {LoadBalancerService} from './load-balancer.service';

@Injectable()
export class AWSService extends LoadBalancerService{
    protected Server = 'http://australtech.ddns.net/';
    protected ConfigApiUrl = 'rest/aws.php';
    protected ServerWithApiUrl = this.Server + this.ConfigApiUrl;
    protected ServerLBUrl = this.Server + 'rest/LB';
    protected DBcreated: boolean;

    constructor(protected http: Http, protected mainService: MainService) {
       super(http,mainService);
       this.createDB();
    }
     
protected createDB() {
        if (!this.DBcreated) {
            this.actionUrl = `${this.ServerWithApiUrl}/db_mgmt/AWS/create/`;
            console.log(this.actionUrl);
            console.log(this.actionUrl);
            return this.http.get(this.actionUrl, this.options).subscribe(() => {
                    console.log('POST OK');
                    this.DBcreated = true;
                }, error => this.mainService.handlerError(error)
            );
        }
    }

public addDevice(aws_access_key_id: string, username: string, aws_secret_access_key: string, getConfiguration: boolean, modules: string, vendor: string): void {
        this.actionUrl = `${this.ServerWithApiUrl}/AWS/`;
        //super.addDevice(hostname,username,password,getConfiguration,modules);
        //this.createDB(); // if DB not created, then create
        //this.actionUrl = `${this.ServerWithApiUrl}/netscalers/`;
        const data = new URLSearchParams();
        data.append('hostname', aws_access_key_id);  
        data.append('aws_access_key_id', encodeURIComponent(aws_access_key_id));
        data.append('aws_secret_access_key', encodeURIComponent(aws_secret_access_key));
        data.append('modules', modules);
        data.append('vendor', vendor);

        data.append('get_configuration', getConfiguration ? getConfiguration.toString() : 'false');

        this.http.post(this.actionUrl, data, this.options).subscribe(() => {
                // this.mainService.handlerSuccess(toast);
                // return true;
                console.log('POST OK');
            }, error => this.mainService.handlerError(error, true)
        );

        // return false;
    }

 public deleteDevice(device: String) {
        this.actionUrl = `${this.ServerWithApiUrl}/AWS/aws_access_key_id/${device}`;
        return super.deleteDevice(device);
    }

    public getDevicesAll(): Observable<DeviceComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/devices/AWS/all`;
        return super.getElement();
    }

    public isDeviceAdded(device: String): Observable<boolean> {
        this.actionUrl = `${this.ServerWithApiUrl}/AWS/aws_access_key_id/${device}`;
        return super.isDeviceAdded(device);
    }

    public isConfigDumpCompleted(device: String): Observable<boolean> {
        this.actionUrl = `${this.ServerWithApiUrl}/AWS/aws_access_key_id/${device}`;
        return super.isConfigDumpCompleted(device);
    }
    
    public dumpConfig(device: String) {        
        this.actionUrl = `${this.ServerWithApiUrl}/configdump/AWS/AWS?aws_access_key_id=${device}`;
        return super.dumpConfig(device);
    }

  public getloadbalancers(hostname: String,offset:number) {        
        this.actionUrl = `${this.ServerWithApiUrl}/loadbalancers/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }

  public searchloadbalancers(hostname: String,offset:number,search:String) {        
        this.actionUrl = `${this.ServerWithApiUrl}/loadbalancers/LoadBalancerName/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
    }
  public getLoadBalancer(loadbalancername: String, hostname: String): Observable<AWSLoadBalancerComponent> {
        this.actionUrl = `${this.ServerWithApiUrl}/loadbalancers/LoadBalancerName/${loadbalancername}`;
        return super.getSingleElement();  
  }

  public getListener(listener: string, hostname: String): Observable<AWSLoadBalancerComponent> {
        listener=encodeURIComponent(listener);
        this.actionUrl = `${this.ServerWithApiUrl}/listeners/ListenerArn/${listener}`;
        return super.getSingleElement();  
  }
    public getListenerv1(listener: string, hostname: String): Observable<AWSLoadBalancerComponent> {
        listener=encodeURIComponent(listener);
        this.actionUrl = `${this.ServerWithApiUrl}/listenersv1/ListenerName/${listener}`;
        return super.getSingleElement();  
  }
  public getZone(zone: string, hostname: String): Observable<AWSLoadBalancerComponent> {
        zone=encodeURIComponent(zone);
        this.actionUrl = `${this.ServerWithApiUrl}/availabilityzones/ZoneName/${zone}`;
        return super.getSingleElement();  
  }
    public getAction(action: string, hostname: String): Observable<AWSLoadBalancerComponent> {
        action=encodeURIComponent(action);
        this.actionUrl = `${this.ServerWithApiUrl}/actions/TargetGroupArn/${action}`;
        return super.getSingleElement();  
  }

  public getListeners(hostname: String,offset:number) { 
      this.actionUrl = `${this.ServerWithApiUrl}/listeners/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
      return super.getElement();
  }
    public searchListeners(hostname: String,offset:number,search:String) { 
        this.actionUrl = `${this.ServerWithApiUrl}/listeners/ListenerArn/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
  }
  public getZones(hostname: String,offset:number) { 
      this.actionUrl = `${this.ServerWithApiUrl}/availabilityzones/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
      return super.getElement();
  }
  public searchZones(hostname: String,offset:number,search:String) { 
        this.actionUrl = `${this.ServerWithApiUrl}/availabilityzones/ZoneName/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
  }
  public getRules(hostname: String,offset:number) { 
      this.actionUrl = `${this.ServerWithApiUrl}/rules/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
      return super.getElement();
  }
  public searchRules(hostname: String,offset:number,search:String) { 
        this.actionUrl = `${this.ServerWithApiUrl}/rules/RuleArn/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
  }
  public getRule(rule: string, hostname: String): Observable<AWSRuleComponent> {
        rule=encodeURIComponent(rule);
        this.actionUrl = `${this.ServerWithApiUrl}/rules/RuleArn/${rule}`;
        return super.getSingleElement();   
  }
  public getActions(hostname: String,offset:number) { 
      this.actionUrl = `${this.ServerWithApiUrl}/actions/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
      return super.getElement();
  }
  public searchActions(hostname: String,offset:number,search:String) { 
        this.actionUrl = `${this.ServerWithApiUrl}/actions/TargetGroupArn/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
  }
  public getTargetgroups(hostname: String,offset:number) { 
      this.actionUrl = `${this.ServerWithApiUrl}/targetgroups/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
      return super.getElement();
  }
  public searchTargetgroups(hostname: String,offset:number,search:String) { 
        this.actionUrl = `${this.ServerWithApiUrl}/targetgroups/TargetGroupArn/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
  }
  public getTargets(hostname: String,offset:number) { 
      this.actionUrl = `${this.ServerWithApiUrl}/targets/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
      return super.getElement();
  }
    public searchTargets(hostname: String,offset:number,search:String) { 
        this.actionUrl = `${this.ServerWithApiUrl}/targets/Id/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
  }
  public getTargetGroup(targetgroup: string, hostname: String): Observable<AWSTargetGroupComponent> {
        targetgroup=encodeURIComponent(targetgroup);
        this.actionUrl = `${this.ServerWithApiUrl}/targetgroups/TargetGroupArn/${targetgroup}`;
        return super.getSingleElement();   
  }
  public getTarget(target: string, hostname: String): Observable<AWSTargetComponent> {
        target=encodeURIComponent(target);
        this.actionUrl = `${this.ServerWithApiUrl}/targets/Id/${target}`;
        return super.getSingleElement();   
  }
  public getTargetGroupsFromListener (listener: string, hostname: String): Observable<AWSTargetGroupComponent> {
        listener=encodeURIComponent(listener);
        this.actionUrl = `${this.ServerWithApiUrl}/listeners/ListenerArn/${listener}`;
        return super.getSingleElement();   
  }
  public getTargetsFromTargetGroup (targetgroup: string, hostname: String): Observable<AWSTargetGroupComponent> {
        targetgroup=encodeURIComponent(targetgroup);
        this.actionUrl = `${this.ServerWithApiUrl}/targets/TargetGroup/${targetgroup}`;
        return super.getSingleElement();   
  }
  public getSSLPolicies(hostname: String,offset:number) { 
      this.actionUrl = `${this.ServerWithApiUrl}/sslpolicies/hostname/${hostname}?offset=${offset}&limit=${this.limit}`;
      return super.getElement();
  }
   public searchSSLPolicies(hostname: String,offset:number,search:String) { 
        this.actionUrl = `${this.ServerWithApiUrl}/sslpolicies/Name/${search}?hostname=${hostname}&search=true&offset=${offset}&limit=${this.limit}`;
        return super.getElement();
  }
  public getSSLPolicy(policy: string, hostname: String): Observable<AWSTargetGroupComponent> {
        policy=encodeURIComponent(policy);
        this.actionUrl = `${this.ServerWithApiUrl}/sslpolicies/Name/${policy}`;
        return super.getSingleElement();   
  }

    public getCertificates(): Observable<LBComponent[]> {
        this.actionUrl = `${this.ServerWithApiUrl}/certificates`;
        return this.getElement();
    }


    public getCertificate(cert: string, hostname: String): Observable<LBComponent> {
        let certEncoded = encodeURIComponent(cert);//Encode to workaround partitions slashes
        this.actionUrl = `${this.ServerWithApiUrl}/certificates/CertificateArn/${certEncoded}`;
        return super.getSingleElement();
    }

  public Export(): Observable<Response> {
        this.actionUrl = `${this.ServerWithApiUrl}/export/aws/data`;
        console.log(this.actionUrl);
        return this.http.get(this.actionUrl, this.options).map(res => {
                return res;
            }, error => this.mainService.handlerError(error)
        );
    }
    
}