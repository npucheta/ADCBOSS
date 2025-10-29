import {Component, OnInit, Input, OnDestroy, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {CanvasDialogComponent} from '../../../shared/canvas-dialog/canvas-dialog.component';
import {GenericObjectDetailComponent} from '../../lb/generic-object-detail/generic-object-detail.component';
import {TaskService} from '../../../services/task.service';
import {environment} from '../../../shared/common';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent extends GenericObjectDetailComponent {
    log_url :string;
    dialogRef: MatDialogRef<any>;
    @Input()
    id: string;
    @Input()
    hostname: string;

    // Custom
    miniTitle: string;
    size: string;
    isDialog: boolean;
    task: Object;
    //
    // @Output() public navToggle: EventEmitter<any> = new EventEmitter<any>(false); // close side-nav before closing dialog for fix issue
    constructor(protected route: ActivatedRoute,
                protected router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef,
                public taskService:TaskService) {
                super(route, router, dialog);
    }

    ngOnInit(): void {
        this.miniTitle = 'Task detail';
        this.title = 'Task detail';
        this.task = this.taskService.getTask(this.id);
        this.log_url="http://australtech.ddns.net/rest/logs/log_"+this.id+".txt";

        super.ngOnInit();    
    }

    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/task');
        }, environment.DELAY_MODAL);
    }
}
