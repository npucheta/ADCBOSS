import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../services/menu.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AuthInterface} from '../../interfaces/auth.Interface';
import {Profile} from '../../models/profile';
import {Menu} from '../../models/menu';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AuthInterface {

    // @Input()
    // hasSecondSub: TemplateRef<any>;
    // itemF: Menu;
    // sub: Array<SubmenuInterface>;
    icon = 'menu';
    title: string;
    items: Array<Menu>;
    profile: Profile;
    name: string;
    username: String;
    all: any;

    constructor(private _menuService: MenuService,
                private _authService: AuthService,
                public router: Router) {
    }

    ngOnInit() {
        this.title = 'Home';
        this.profile = this._authService.getProfile();
        this.username=this._authService.username;
        this.listItems();
    }

    listItems() {
        this.items = this._menuService.ITEMS; // TODO must get from API to a dynamic menu
    }

    public toggleMe(e) {
        e.toggle();
        this.icon = (e.opened) ? ('close') : ('menu');
    }

    public isHome() {
        return (('Home' === this.title) && ('/home' === window.location.pathname));
    }

    public logout(): void {
        return this._authService.logout();
    }

    public isLoggedIn(): boolean {
        return this._authService.isAuthenticated();
    }

    public setTitle(event) {
        this.title = event;
    }

    /*public clickOnMP(e): void {
     // event.preventDefault();
     // this.render.setAttribute(e.target, 'class', 'active');
     console.log('clickOnMP', e);
     }*/
}
