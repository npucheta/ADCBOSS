import {Headers, RequestOptions} from '@angular/http';
import {MainService} from './main.service';
import {ToastService} from './toast.service';
import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';

import {
    DeviceComponent,
    Task,
    Virtual,
    Pool
} from '../components/lb/objects';

@Injectable()
export class HttpService {
    protected actionUrl: string;
    protected headers: Headers;
    protected Server : string;
    protected options: RequestOptions;
    protected dump_task_id: String;
    protected ConfigApiUrl: string;
    protected ServerWithApiUrl = this.Server + this.ConfigApiUrl;

    constructor(protected http: Http,protected mainService:MainService) {
      // this.createDB();
       this.Server='http://australtech.ddns.net/';
        this.headers = new Headers();
        this.headers.append('Token', '4a12G3Js4aV82x2s');
        //this.headers.append('Content-Type','application/json');
        this.options = new RequestOptions({headers: this.headers});
        this.dump_task_id='';    
      }


    public getElement(): Observable<Object[]> {
        console.log('API URL ' + this.actionUrl);
        return this.http.get(this.actionUrl, this.options).map(res => {
                if (res == null || res.json() == null) {
                    return [];
                }
                if (res.json().hasOwnProperty('error')) {
                    return [];
                } else {
                    return res.json();
                }
            }, error => this.mainService.handlerError(error)
        );
    }
    public getSingleElement(): Observable<Object> {
        console.log('API URL ' + this.actionUrl);
        return this.http.get(this.actionUrl, this.options).map(res => {
                if (res == null || res.json() == null) {
                    return [];
                }

                if (res.json().hasOwnProperty('error')) {
                    return [];
                } else {
                    return res.json();
                }
            }, error => this.mainService.handlerError(error)
        );

    }
}
