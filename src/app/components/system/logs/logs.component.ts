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
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  protected logs: Observable<LBComponent[]>;
  protected logsurl: String;
  protected title: String;

  constructor(protected http: Http,
              private systemService:SystemService,
                  protected router: Router) { }
 ngOnInit() {
          this.logsurl ='http://australtech.ddns.net/logs/';
          this.logs=this.systemService.listLogs();
          this.title='System Logs';
  }
}
