import { Component, OnInit } from '@angular/core';
import {SystemService} from '../../../services/system.service';
import {DevicesService} from '../../../services/lb/devices.service';
import {UsersService}  from '../../../services/users.service';
import {User} from '../../lb/objects';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import {Headers} from '@angular/http';
import { Http, Response } from '@angular/http';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  protected users: Observable<User[]>;
  protected backupsurl: String;
  protected title: String;
  protected option:String;
  protected form: FormGroup;
  protected _user: String;
  protected _password: String;
  protected _role: String;
  protected _authentication: String;
  protected _shell_access: String;

  constructor(protected http: Http,
              private usersService:UsersService,
              protected router: Router) { }

  ngOnInit() {
    this.title='Users';
    this.users=this.usersService.getUsers();
    this.option='list';
    this.form = new FormGroup({
      user: new FormControl(),
      password: new FormControl(),
      role: new FormControl()
  });
  }

  show_form(){
    console.log('create user form');
    this.option='create';
  }
  
  public sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
  }

  async create_user()
  {
        let user: User;
        user = new User();
        user.user=this._user;
        user.password=this._password;
        user.role=this._role;
        user.authentication='Local';
        user.shell_access='No';
        this.usersService.createUser(user);
        await this.sleep(1000); // TODO arbitrary delay

        console.log('created user');
        this.users=this.usersService.getUsers(); //refresh view
        this.option='list';

  }
}
