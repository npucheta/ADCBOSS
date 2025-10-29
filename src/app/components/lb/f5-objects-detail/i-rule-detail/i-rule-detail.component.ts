import {Component, Input, ViewContainerRef} from '@angular/core';
import {iRuleComponent} from '../../objects';
import {ActivatedRoute, Router} from '@angular/router';
import {DevicesService} from '../../../../services/lb/devices.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog} from '@angular/material';
import {GenericObjectDetailComponent} from '../../generic-object-detail/generic-object-detail.component';
import {environment} from '../../../../shared/common';

@Component({
    selector: 'app-i-rule-detail',
    templateUrl: './i-rule-detail.component.html',
    styleUrls: ['./i-rule-detail.component.css']
})

export class iRuleDetailComponent extends GenericObjectDetailComponent { // TODO change to standard camelCase
    irule: Observable<iRuleComponent>;
    
    constructor(public devicesService: DevicesService,
                public route: ActivatedRoute,
                public router: Router,
                public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        super(route, router, dialog);
    }

    ngOnInit(): void {
        this.title = 'iRules';
        super.ngOnInit();
        this.irule = this.devicesService.getiRule(this.id, this.hostname);
    }

    // TODO implement in future and move to utils and add close automatic
    public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/irule');
        }, environment.DELAY_MODAL);
    }
}
