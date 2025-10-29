import {Component, OnInit} from '@angular/core';
import {SNATPoolComponent} from '../../objects';
import {ActivatedRoute} from '@angular/router';
import {DevicesService} from '../../../../services/lb/devices.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {MatDialog} from '@angular/material';
import {GenericObjectDetailComponent} from '../../generic-object-detail/generic-object-detail.component';
import {environment} from '../../../../shared/common';

@Component({
    selector: 'app-snatpool-detail',
    templateUrl: '../../generic-object-detail/generic-object-detail.component.html',
    styleUrls: ['./snatpool-detail.component.css']
})
export class SNATPoolDetailComponent extends GenericObjectDetailComponent {
    snatpool: Observable<SNATPoolComponent>;


    //
    constructor(public devicesService: DevicesService,
                public route: ActivatedRoute,
                public router: Router,
                public dialog: MatDialog) {
        super(route, router, dialog);
    }

    ngOnInit(): void {
        this.title = 'SNAT Pools';
        super.ngOnInit();
        this.component = this.devicesService.getSNATPool(this.id, this.hostname);
    }


  public goSelf(): void {
        setTimeout(() => {
            super.goSelf('/snatpool');
        }, environment.DELAY_MODAL);
    }
}
