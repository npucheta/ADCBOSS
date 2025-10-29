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
    Pool,
    User
} from '../components/lb/objects';

@Injectable()
export class UsersService extends HttpService{
    protected actionUrl: string;
    protected headers: Headers;
    protected ConfigApiUrl: string;
    protected ServerWithApiUrl = this.Server + this.ConfigApiUrl;
    protected options: RequestOptions;
    protected dump_task_id: String;

    constructor(protected http: Http,protected mainService:MainService,protected toast:ToastService) {
       super(http,mainService);
       this.ConfigApiUrl = 'rest/Users/UsersManager.php';
       this.ServerWithApiUrl = this.Server + this.ConfigApiUrl;

    }

    public getUsers() {        
        this.actionUrl = `${this.ServerWithApiUrl}/users/`;
        return this.getElement();
    }
    
    public getUser(user:String) {        
        this.actionUrl = `${this.ServerWithApiUrl}/users/user/${user}`;
        return this.getSingleElement();
    }

    public createUser (user: User)
    {
       this.actionUrl = `${this.ServerWithApiUrl}/createuser/`;
       this.http.post(this.actionUrl, JSON.stringify(user), this.options).subscribe((reply) => {
                        // this.mainService.handlerSuccess(toast);
                        // return true;
                        console.log('USER POST OK');
                        console.log(reply.json()); 
                        this.toast.showSuccess();
                    }, error => this.mainService.handlerError(error, true)
                );
    }
    public deleteUser (user:string)
    {
        this.actionUrl = `${this.ServerWithApiUrl}/deleteuser/${user}`;
        return this.getSingleElement();
    }

    public authUser (user: User)
    {
       this.actionUrl = `${this.ServerWithApiUrl}/authuser/`;
       this.http.post(this.actionUrl, JSON.stringify(user), this.options).subscribe((reply) => {
                        // this.mainService.handlerSuccess(toast);
                        // return true;
                        console.log('USER POST OK');
                        console.log(reply.json()); 
                        this.toast.showSuccess();
                    }, error => this.mainService.handlerError(error, true)
                );
    }

}
