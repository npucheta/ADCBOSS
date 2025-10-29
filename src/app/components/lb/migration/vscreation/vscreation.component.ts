import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Pool,Virtual,DeviceComponent} from '../../objects';
import {TaskService} from '../../../../services/task.service'; 
import {Observable} from 'rxjs/Observable';
import {GenericLoadBalancerService} from '../../../../services/lb/generic-load-balancer.service';

@Component({
  selector: 'app-vscreation',
  templateUrl: './vscreation.component.html',
  styleUrls: ['./vscreation.component.css']
})
export class VscreationComponent implements OnInit {
  protected form: FormGroup;
  readonly PROTOCOLS = [
        'TCP',
        'UDP',
        'ANY'
    ];

  readonly SERVICETYPES = [
        'HTTP',
        'FTP',
        'TCP',
        'UDP',
        'SSL',
        'DNS'
    ];
  protected _destination: String;
  protected _servicetype: String;
  protected _virtualname: String;
  protected _ip: String;
  protected _port: String;
  protected _netmask: String;
  protected _pool_member1: String;
  protected _pool_member2: String;
  protected _device:DeviceComponent;
  protected devices: Observable<DeviceComponent[]>;

  constructor(protected taskService:TaskService,
              protected _genericLoadBalancer:GenericLoadBalancerService) { }

  ngOnInit() {
      this.form = new FormGroup({
      virtualname: new FormControl(),
      ip: new FormControl(),
      port: new FormControl(),
      netmask: new FormControl(true),
      servicetype: new FormControl(),
      pool_member1: new FormControl(),
      pool_member2: new FormControl()
  });
  this.devices = this._genericLoadBalancer.getDevicesAll();

  }

protected submit()
{ 
  let pool: Pool;
  let virtual: Virtual;
  console.log(this._virtualname + ' ' + this._ip + ' '+ this._port + ' ' + this._netmask + ' ' + this._servicetype + ' ' + this._pool_member1 + ' ' + this._pool_member2);

  pool = new Pool();
  pool.pool_name=this._virtualname+'_pool';
  pool.pool_members = [];

  pool.pool_members.push(this._pool_member1);
  pool.pool_members.push(this._pool_member2);

  virtual = new Virtual();
  virtual.virtual_id=this._virtualname;
  virtual.ip=this._ip;
  virtual.port=this._port;
  virtual.netmask=this._netmask;
  if(this._servicetype=="UDP")
    virtual.protocol="UDP";
  else
    virtual.protocol="TCP";
  virtual.type=this._servicetype;
  virtual.pool=pool;

  this.taskService.createVSCreationTask('Oscar',virtual,this._device);

  console.log('Submitted');
}

}
