import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {MainService} from './main.service';
import {ToastService} from './toast.service';
import {Router} from '@angular/router';
import {Login} from '../models/login';
import {Profile} from '../models/profile';
import {User} from '../models/user';

@Injectable()
export class AuthService {
    //private readonly PATH_API = 'http://jsonstub.com'; // TODO simple simulation, add owner API
    //private readonly PATH_LOGIN = `${this.PATH_API}/login`; // TODO simple simulation, add owner API

    private readonly PATH_API = 'http://australtech.ddns.net';
    private readonly PATH_LOGIN = `${this.PATH_API}/rest/Users/UsersManager.php/authuser`; 
    public username: String;

    constructor(private _http: Http,
                private _mainService: MainService,
                private toast: ToastService,
                public router: Router) {
    }

    public login(user: Login): Observable<boolean> {
        const params = JSON.stringify({
            user: user.user,
            password: user.password
        });
        const headers = new Headers({
            // 'Content-Type': 'application/x-www-form-urlencoded'
            'Content-Type': 'application/json',
            //'JsonStub-User-Key': '81d72e5e-47aa-4680-b969-7917dab287f1',
            //'JsonStub-Project-Key': '3510dda1-50e8-4de8-842a-8df3eb3f7db6'
        });
        return this._http.post(this.PATH_LOGIN, params, {headers}).map(
            res => {
                this._mainService.handlerSuccess(true);
                console.log(res);
                return this.handleAuthentication(res);
            },
            error => this._mainService.handlerError(error,true)
        );
    }

    private handleAuthentication(authResult): boolean {
        const buffer = JSON.parse(authResult._body);
        console.log(buffer);
        if(buffer.result=='Login Accepted' && buffer.token)
        {
            const user: User = {
                name: buffer.name,
                token: buffer.token
            };
            this.setSession(user);
            return true;
        } else {
            console.log('Invalid login information..', buffer);
            this._mainService.handlerError('Invalid login information..',true);
        }
        return false;
    }

    private setSession(user: User): void {
        // const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('name', user.name);
        localStorage.setItem('token', user.token);
        this.username=user.name;
        console.log('SETTTTTTTTTTTTTTTTTTTING '+user.name);
        // localStorage.setItem('expires_at', expiresAt);
    }

    public isAuthenticated(): boolean {
        return (is.not.null(localStorage.getItem('token')));
    }

    public getProfile(): Profile {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Access token must exist to fetch profile');
        }

        return {
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email')
        };
    }

    public isGranted(): void {
        if (!this.isAuthenticated()) {
            this.router.navigate(['/login']).then(() => {
                console.log('is not granted!');
            });
        }
    }

    public logout(): void {
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

}
