import {Headers, RequestOptions} from '@angular/http';
import {MainService} from './main.service';
import {ToastService} from './toast.service';
import {HttpService} from './http.service';
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
export class TaskService extends HttpService{

    protected dump_task_id: String;

    constructor(protected http: Http,protected mainService:MainService,protected toast:ToastService) {
       super(http,mainService);
       this.ConfigApiUrl = 'rest/Tasks/TaskManager.php';
       this.ServerWithApiUrl = this.Server + this.ConfigApiUrl;

       this.headers.append('Content-Type','application/json');

    }

    public getTasks() {        
        this.actionUrl = `${this.ServerWithApiUrl}/tasks/`;
        return this.getElement();
    }

    public getTask(id:String) {        
        this.actionUrl = `${this.ServerWithApiUrl}/tasks/id/${id}`;
        return this.getSingleElement();
    }

    public createMigrationTask(_owner:string,state:string,type:string,source:DeviceComponent,destination:DeviceComponent,depends_on:String):String // Return the task_id created if successful
    {
       this.actionUrl = `${this.ServerWithApiUrl}/create/`;
        let data: Task;
        data = new Task();
        data.owner=_owner;
        data.state=state;
        data.type=type;
        data.source_hostname=source.hostname;
        data.source_vendor=source.vendor;
        data.destination_hostname=destination.hostname;
        data.destination_vendor=destination.vendor;
        data.depends_on=depends_on;
        data.creation_time=Date();
        data.execution_time='N/A';

       
        this.http.post(this.actionUrl, JSON.stringify(data), this.options).subscribe((reply) => {
                        // this.mainService.handlerSuccess(toast);
                        // return true;
                        console.log('TASK POST OK');
                        this.dump_task_id=reply.json();
                        console.log(this.dump_task_id); 
                        if(data.type=='VS_MIGRATION_DUMP') //if task is migration dump then we create the load task corresponding to it using recursion
                            {
                                this.createMigrationTask(_owner,'IMPLEMENTATION_PENDING','VS_MIGRATION_LOAD',source,destination,this.dump_task_id);
                            }

                        this.toast.showSuccess(); // TODO make directive or add to addDevice
                    }, error => this.mainService.handlerError(error, true)
                );
        return this.dump_task_id;            
    }    
    

    public createMigrationTasks(_owner:string,source:DeviceComponent,destination:DeviceComponent,)
    {
        this.createMigrationTask(_owner,'IMPLEMENTATION_PENDING','VS_MIGRATION_DUMP',source,destination,'');
    }


    public createVSCreationTask (_owner:string,virtual: Virtual,destination:DeviceComponent)
    {
       this.actionUrl = `${this.ServerWithApiUrl}/create/`;
        let data: Task;
        data = new Task();
        data.owner=_owner;
        data.type='VS_CREATION';
        data.destination_hostname=destination.hostname;
        data.destination_vendor=destination.vendor;
        data.creation_time=Date();
        data.execution_time='N/A';
        data.virtual=virtual;

       
        this.http.post(this.actionUrl, JSON.stringify(data), this.options).subscribe((reply) => {
                        // this.mainService.handlerSuccess(toast);
                        // return true;
                        console.log('TASK POST OK');
                        this.dump_task_id=reply.json();
                        console.log(this.dump_task_id); 
                        this.toast.showSuccess(); // TODO make directive or add to addDevice
                    }, error => this.mainService.handlerError(error, true)
                );
        return this.dump_task_id;            
    }


}
