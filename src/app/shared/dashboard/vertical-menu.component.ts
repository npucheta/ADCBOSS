import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Menu} from '../../models/menu';

@Component({
    selector: 'app-vertical-menu',
    templateUrl: './vertical-menu.component.html'
})
export class VerticalMenuComponent implements OnInit, AfterViewInit {

    @Input()
    items: Array<Menu>;
    @Output()
    title: EventEmitter<string> = new EventEmitter<string>();

    /* name: string;
    sub: Array<SubmenuInterface>;
    all: any;
    ctx = {
        $implicit: 'any',
        name: this.name,
        items: this.sub
    };*/

    constructor(private _cd: ChangeDetectorRef) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        /*this.ctx = {
            $implicit: 'changed!',
            name: this.name,
            items: this.sub
        };*/
        this._cd.detectChanges();
    }

    setTitle(title: string) {
        this.title.emit(title);
    }

    /*public setCurrentItem(name: string, sub: Array<SubmenuInterface>, index: number, all: SubmenuInterface) {
        this.counter++;
        /!*if (environment.DEBUG) {
            console.log('name ==> ', name);
            console.log('sub ==> ', sub);
            console.log('index ==> ', index);
        }*!/

        this.sub = sub;
        this.currentIndex = index;
        // this.all.push(all);
        this.all = all;

        this.name = `${all.name} - ${index}`;
        this.subItems = {
            name: name,
            items: sub,
            index: index
        };
        // this.ngAfterViewInit();
        // this._cd.detectChanges();
    }*/

}
