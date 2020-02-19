import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap, flatMap } from 'rxjs/operators';

import { ActionTypes, SuccessfullyLogged, Login, LoginError, InvalidLogin, Logout } from './login.actions'
import { LoginService } from '../login.service';
import { AuthenticationToken } from '../login.model';
import { of, Observable } from 'rxjs';
import { TokenService } from 'src/app/token/token.service';
import { environment } from 'src/environments/environment';
import { EMPTY_ACTION } from 'src/app/action/action-utils';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginEffects {

    @Effect()
    login$ = this.actions$.pipe(ofType(ActionTypes.Login), flatMap((action: Login) => {                     
        return this.service.authenticate(action.payload).pipe(map((authToken: AuthenticationToken) => {
            if(authToken != null && authToken.token != null && authToken.token.length > 0) {                
                return new SuccessfullyLogged(authToken);                
            } else { 
                return new InvalidLogin();
            }
        }), catchError(() => of(new LoginError())));
    })); 
    
    @Effect({
        dispatch: false
    })
    successfullyLogged$ = this.actions$.pipe(ofType(ActionTypes.SuccessfullyLogged), tap((action: SuccessfullyLogged) => {
        this.tokenService.setToken(action.payload.token);
    }));

    @Effect({
        dispatch: false
    })
    logout$ = this.actions$.pipe(ofType(ActionTypes.Logout), tap(() => {
        this.tokenService.deleteToken()
        this.router.navigate(['login']);
    }));

    @Effect()
    refresh$ = this.actions$.pipe(ofType(ActionTypes.Refresh), switchMap(() => {
        console.log('calling refresh');
        if(this.tokenService.getTimeToExpire() > environment.tokenReAuthenticateTime)
            return of(EMPTY_ACTION);
        console.log('It has to refresh');

        return this.service.refresh().pipe(map((authToken: AuthenticationToken) => {
            if(authToken != null && authToken.token != null && authToken.token.length > 0) {                
                return new SuccessfullyLogged(authToken);
            } else { 
                return new Logout();
            }
        }), catchError(() => of(new Logout())));
    }));

    constructor(
        private actions$: Actions,
        private service: LoginService,
        private tokenService: TokenService,
        private router: Router,
    ) {}

    ofType(type: ActionTypes): Observable<ActionTypes> {
        return this.actions$.pipe(ofType(type));
    }

}