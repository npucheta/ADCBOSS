import { Component, OnInit } from '@angular/core';
import {SystemService} from '../../../services/system.service';
import {DevicesService} from '../../../services/lb/devices.service';
import {LBComponent} from '../../lb/objects';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import {Headers} from '@angular/http';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-backups',
  templateUrl: './backups.component.html',
  styleUrls: ['./backups.component.css']
})
export class BackupsComponent implements OnInit {
  protected backups: Observable<LBComponent[]>;
  protected backupsurl: String;
  protected title: String;

  constructor(protected http: Http,
              private systemService:SystemService,
                  protected router: Router) { }

  ngOnInit() {
    this.title='Backups';
    this.backups=this.systemService.listBackups();
    
  }

  create(){
        console.log ('Creating backup');
        this.systemService.createBackup().subscribe(() =>{
                  this.backups=this.systemService.listBackups(); //refresh view
        })

  }



  upload (event) {
    //this.systemService.upload(event);
     let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];
            let formData:FormData = new FormData();
            formData.append('uploadFile', file, file.name);
            let headers = new Headers();
            /** No need to include Content-Type in Angular 4 */
            //headers.append('Content-Type', 'application/json');
            //headers.append('Accept', 'application/json');
            let options = new RequestOptions({ headers: headers });
            this.http.post(`http://australtech.ddns.net/rest/System/system.php/upload/`, formData, options)
                .map(res => res.json())
                .catch(error => Observable.throw(error))
                .subscribe(
                    data => {console.log('success');this.backups=this.systemService.listBackups();},
                    error => console.log(error)
                )
    }
  }
}
