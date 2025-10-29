import {Component, OnInit, Input} from '@angular/core';
import {Validators, FormGroup, FormControl} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Login} from '../../models/login';
import {Router} from '@angular/router';
import {AuthInterface} from '../../interfaces/auth.Interface';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AuthInterface {
    public readonly MIN_LENGTH_USERNAME = 5;
    public readonly MIN_LENGTH_PASSWORD = 5;
    public form: FormGroup;

    constructor(private _authService: AuthService,
                public router: Router) {
    }

    ngOnInit() {
        if (this._authService.isAuthenticated()) {
            window.location.href = '/home';
        }

        this.form = new FormGroup({
            username: new FormControl('', [
                    Validators.required,
                    Validators.minLength(this.MIN_LENGTH_USERNAME)
                ]
            ),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(this.MIN_LENGTH_PASSWORD)
            ])
        });
    }

    public sign() {
        const user: Login = {
            user: this.form.get('username').value,
            password: this.form.get('password').value
        };
        this._authService.login(user).subscribe(res => {
            if (res) {
                window.location.href = '/home';
            }
        });
    }

    public isLoggedIn(): boolean {
        return this._authService.isAuthenticated();
    }
}
