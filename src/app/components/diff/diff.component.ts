import {
    AfterViewInit,
    ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, ViewChild,
    ViewContainerRef
} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {GSLBService} from '../../services/gslb/gslb.service';
import {MatSidenav} from '@angular/material';
import {environment} from '../../shared/common';

declare let difflib: any;
declare let diffview: any;

@Component({
    selector: 'app-diff',
    templateUrl: './diff.component.html',
    styleUrls: ['./diff.component.css']
})
export class DiffComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

    @Input() archive1;
    @Input() file_for_comparison_in_archive1;
    @Input() archive2;
    @Input() file_for_comparison_in_archive2;
    @Input() deviceService;
    @ViewChild('diffoutput') diffoutputdiv;
    @Input()
    sideNav: MatSidenav;
    container: Element;
    configfile1: String;
    configfile2: String;
    contextSize: String;
    isDiff = false;

    constructor(private _gslbdevicesService: GSLBService,
                public route: ActivatedRoute,
                public location: Location,
                public router: Router,
                private _cd: ChangeDetectorRef,
                public viewContainerRef: ViewContainerRef) {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.container = document.querySelector('#diffoutput');
    }

    ngOnChanges() {
        this.deviceService.getConfigFileInArchive(this.archive1, this.file_for_comparison_in_archive1).subscribe(
            data => {
                setTimeout(() => {
                    this.configfile1 = data;
                    this._cd.detectChanges();
                }, 200);
            });
        this.deviceService.getConfigFileInArchive(this.archive2, this.file_for_comparison_in_archive2).subscribe(
            data => {
                setTimeout(() => {
                    this.configfile2 = data;
                    this._cd.detectChanges();
                }, 200);
            });
    }

    ngOnDestroy() {
    }

    diffUsingJS(viewType) {
        'use strict';
        // var byId = function (id) { return <HTMLInputElement>document.getElementById(id); },
        // base = difflib.stringAsLines(byId("baseText").value),
        // newtxt = difflib.stringAsLines(byId("newText").value),
        const base = difflib.stringAsLines(`${this.configfile1}`);
        const newtxt = difflib.stringAsLines(`${this.configfile2}`);
        const sm = new difflib.SequenceMatcher(base, newtxt);
        const opcodes = sm.get_opcodes();
        // diffoutputdiv = byId("diffoutput"),
        // contextSize = byId("contextSize").value;

        // this.diffoutputdiv.innerHTML = "";
        // contextSize = contextSize || null;
        if (environment.DEBUG) {
            console.log('Clicked compare');
            console.log('this.container ==> ', this.container);
            console.log(opcodes);
            console.log(sm);
        }
        if (this.container instanceof Element) {
            this.container.innerHTML = '';
        }

        this.diffoutputdiv.nativeElement.appendChild(diffview.buildView({
            baseTextLines: base,
            newTextLines: newtxt,
            opcodes: opcodes,
            baseTextName: 'Base Text',
            newTextName: 'New Text',
            contextSize: this.contextSize,
            viewType: viewType
        }));
        this.isDiff = true;
        /*
         diffoutputdiv.appendChild(diffview.buildView({
         baseTextLines: base,
         newTextLines: newtxt,
         opcodes: opcodes,
         baseTextName: "Base Text",
         newTextName: "New Text",
         contextSize: contextSize,
         viewType: viewType
         }));*/
    }

    public closeSideNav(): void {
        this.sideNav.close().then(() => {
            this.isDiff = false;
            if (this.container instanceof Element) {
                this.container.innerHTML = '';
            }
        });
    }
}
