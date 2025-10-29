import {ActivatedRoute, Router} from '@angular/router';
import {Component, Input, OnDestroy, ViewContainerRef, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogRef} from '@angular/material';
import {environment} from '../../../shared/common';
import {GenericObjectDetailComponent} from '../../lb/generic-object-detail/generic-object-detail.component';
import {UsersService} from '../../../services/users.service';
import {LBComponent} from '../../lb/objects';
import {
    DeviceComponent,
    Task,
    Virtual,
    Pool,
    User
} from '../../../components/lb/objects';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent extends GenericObjectDetailComponent {
  @Input() id: string;
    protected userdetails: Observable<User>;

  constructor(protected route: ActivatedRoute,
                protected router: Router,
                protected dialog: MatDialog,
                private usersService:UsersService) { 
                  super(route,router,dialog);
                }

  ngOnInit() {
      this.title='User Details';
      console.log('Backup ID'+this.id);
      super.ngOnInit();
      this.userdetails=this.usersService.getUser(this.id);
  }

  public sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async delete() {
    console.log('Deleting user '+this.id);
    this.usersService.deleteUser(this.id).subscribe();
    await this.sleep(1000); // TODO arbitrary delay

    this.router.navigate(['/users']).then();
  }
  
}
