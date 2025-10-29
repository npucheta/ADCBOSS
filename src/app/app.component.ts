import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
    selector: 'app-adcboss',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public title = 'ADCBoss';
    public loggedIn: boolean;

    constructor(private _authService: AuthService) {
    }

    ngOnInit(): void {
        this._authService.isGranted(); // extra security
    }

    public isLoggedIn(): boolean {
        return this._authService.isAuthenticated();
    }
}
