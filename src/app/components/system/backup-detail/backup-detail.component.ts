import {ActivatedRoute, Router} from '@angular/router';
import {Component, Input, OnDestroy, ViewContainerRef, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {environment} from '../../../shared/common';
import {GenericObjectDetailComponent} from '../../lb/generic-object-detail/generic-object-detail.component';
import {SystemService} from '../../../services/system.service';
import {LBComponent} from '../../lb/objects';

@Component({
  selector: 'app-backup-detail',
  templateUrl: './backup-detail.component.html',
  styleUrls: ['./backup-detail.component.css']
})
export class BackupDetailComponent extends GenericObjectDetailComponent {
  @Input() id: string;
  protected backupsurl: String;
  protected backupdetails;
  constructor(protected route: ActivatedRoute,
                protected router: Router,
                protected dialog: MatDialog,
                private systemService:SystemService) { 
                  super(route,router,dialog);
                }

  ngOnInit() {
      this.backupsurl='http://australtech.ddns.net/rest/System/Backups/';
      this.title='Backup Details';
      console.log('Backup ID'+this.id);
      super.ngOnInit();
      this.backupdetails=this.systemService.getBackupDetails(this.id);
  }

  delete(){
    this.systemService.deleteBackup(this.id).subscribe();
    this.router.navigate(['backups']);

  }
  restore(){
        let backupfile=this.id;
        console.log ('Restoring backup '+backupfile);
        this.systemService.restoreBackup(backupfile).subscribe();

  }
  
}
