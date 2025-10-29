import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custommsg',
  templateUrl: './custommsg.component.html',
  styleUrls: ['./custommsg.component.css']
})
export class CustomMsgComponent implements OnInit {

  public message:String;

  constructor() { 
  }

  ngOnInit() {
    this.message='custom msg';
  }

}
