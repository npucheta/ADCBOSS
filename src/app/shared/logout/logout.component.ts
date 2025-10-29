import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-logout',
    template: ``,
})
export class LogoutComponent implements OnInit {

    constructor(private _authService: AuthService) {
    }

    ngOnInit() {
        this._authService.logout();
    }
}
