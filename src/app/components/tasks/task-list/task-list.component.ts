import {Component, Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TaskService} from '../../../services/task.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {TaskComponent} from '../task/task.component';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  dialogRef: MatDialogRef<any>;

  constructor(public taskService:TaskService,
              public dialog: MatDialog,
              public viewContainerRef: ViewContainerRef) {

   }
  tasks: Observable<Object[]>;

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  public isSearchItem(search: string, objectToSearch): boolean {
        if (objectToSearch != null || objectToSearch !== undefined) {
            return search.toLowerCase().includes(objectToSearch.toLowerCase());
        }
        return true;
    }


    openDialog(option: string, id: string,hostname:string): void {
        console.log ('task id  '+id);
        const config = new MatDialogConfig();
        config.viewContainerRef = this.viewContainerRef;

        let component;
        component = TaskComponent;
        
        if (component) {
            this.dialogRef = this.dialog.open(component, config);
            this.dialogRef.componentInstance.id = id;
            this.dialogRef.componentInstance.hostname = hostname;

            this.dialogRef.afterClosed().subscribe(() => {
                this.dialogRef = null;
            });
        }
    }
}
