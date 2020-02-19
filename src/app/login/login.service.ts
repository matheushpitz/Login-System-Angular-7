import { Injectable } from '@angular/core';
import { UserAuthentication, AuthenticationToken, AuthenticateResponse } from './login.model';
import { Observable } from 'rxjs';
import { HttpAPI } from '../http/http.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    
    constructor(private http: HttpAPI) {}

    authenticate(user: UserAuthentication): Observable<AuthenticationToken> {
        return this.http.post<AuthenticateResponse>('/Login/Authenticate', user, false, false).pipe(map(res => res.data));
    }

    refresh(): Observable<AuthenticationToken> {
        return this.http.post<AuthenticateResponse>('/Login/Reauthenticate', null, true, false).pipe(map(res => res.data));
    }

}