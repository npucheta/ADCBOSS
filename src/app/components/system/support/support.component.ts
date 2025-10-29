import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, Input, OnDestroy, ViewContainerRef, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {environment} from '../../../shared/common';
import {GenericObjectDetailComponent} from '../../lb/generic-object-detail/generic-object-detail.component';
import {SystemService} from '../../../services/system.service';
import {LBComponent} from '../../lb/objects';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  protected title: String;
  protected supporturl: String;
  protected supports: Observable<LBComponent[]>;

  constructor(protected route: ActivatedRoute,
                protected router: Router,
                protected dialog: MatDialog,
                private systemService:SystemService) 
                { 

                }
  
  ngOnInit() {
          this.title='Support';
          this.supporturl ='http://australtech.ddns.net/rest/System/Support/';
          this.supports=this.systemService.listSupportFiles(); 

  }

  create(){
        console.log ('Creating Support file');
        this.systemService.createSupportFile().subscribe(() =>{
                  this.supports=this.systemService.listSupportFiles(); //refresh view
        })

  }

}
