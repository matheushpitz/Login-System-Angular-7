import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';
import { UserAuthentication } from '../login.model';
import { Store } from '@ngrx/store';
import { Login, Logout } from './login.actions';

@Injectable({
    providedIn: 'root'
})
export class LoginFacade {
    constructor(
        private login: LoginService,
        private store: Store<any>
    ) {}

    authenticate(user: UserAuthentication) {
        this.store.dispatch(new Login(user));
    }

    logout() {
        this.store.dispatch(new Logout());
    }
}