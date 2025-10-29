import {Headers, RequestOptions} from '@angular/http';
import {MainService} from './main.service';
import {ToastService} from './toast.service';
import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from './http.service';


import {
    DeviceComponent,
    Task,
    Virtual,
    Pool
} from '../components/lb/objects';

@Injectable()
export class SystemService extends HttpService{
    protected actionUrl: string;
    protected headers: Headers;
    protected ConfigApiUrl: string;
    protected ServerWithApiUrl = this.Server + this.ConfigApiUrl;
    protected options: RequestOptions;
    protected dump_task_id: String;

    constructor(protected http: Http,protected mainService:MainService,protected toast:ToastService) {
       super(http,mainService);
       this.ConfigApiUrl = 'rest/System/system.php';
       this.ServerWithApiUrl = this.Server + this.ConfigApiUrl;

    }

    public listLogs(){
        this.actionUrl = `${this.ServerWithApiUrl}/listlogs/`;
        return this.getElement();
    }

    public listBackups(){
        this.actionUrl = `${this.ServerWithApiUrl}/listbackups/`;
        return this.getElement();
    }
    public listSupportFiles(){
        this.actionUrl = `${this.ServerWithApiUrl}/listsupportfiles/`;
        return this.getElement();
    }

    public createBackup(){
        this.actionUrl = `${this.ServerWithApiUrl}/createbackup/`;
        return this.getElement();
        
    }

    public createSupportFile(){
        this.actionUrl = `${this.ServerWithApiUrl}/createsupportfile/`;
        return this.getElement();
        
    }

    public restoreBackup(backupfile: String){
        this.actionUrl = `${this.ServerWithApiUrl}/restorebackup/${backupfile}`;
        return this.getElement();
        
    }

    public getBackupDetails(filename:String)
    {
        this.actionUrl = `${this.ServerWithApiUrl}/backupdetails/${filename}`;
        return this.getElement();
    }
    public deleteBackup(filename:String)
    {
        this.actionUrl = `${this.ServerWithApiUrl}/deletebackup/${filename}`;
        return this.getElement();
    }

    public upload(event)
    {
       
    }
}
