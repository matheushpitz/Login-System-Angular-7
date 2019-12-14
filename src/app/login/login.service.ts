import { Injectable } from '@angular/core';
import { UserAuthentication, AuthenticationToken } from './login.model';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    
    constructor() {

    }

    authenticate(user: UserAuthentication): Observable<AuthenticationToken> {
        if(user.username === 'admin' && user.password === 'admin')
            return of(new AuthenticationToken('123456'));
        else
            return of(new AuthenticationToken(null));
    }

}