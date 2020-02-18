import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

import { ActionTypes, SuccessfullyLogged, Login, LoginError, InvalidLogin } from './login.actions'
import { LoginService } from '../login.service';
import { AuthenticationToken } from '../login.model';
import { of, Observable, empty } from 'rxjs';
import { TokenService } from 'src/app/token/token.service';

@Injectable({
    providedIn: 'root'
})
export class LoginEffects {

    @Effect()
    login$ = this.actions$.pipe(ofType(ActionTypes.Login), switchMap((action: Login) => {               
        return this.service.authenticate(action.payload).pipe(map((authToken: AuthenticationToken) => {
            if(authToken != null && authToken.token != null && authToken.token.length > 0)
                return new SuccessfullyLogged(authToken);
            else 
                return new InvalidLogin();
        }), catchError(() => of(new LoginError())));
    }));

    @Effect()
    successfullyLogged$ = this.actions$.pipe(ofType(ActionTypes.SuccessfullyLogged), switchMap((action: SuccessfullyLogged) => {
        this.tokenService.setToken(action.payload.token);
        return empty;
    }));

    @Effect()
    logout$ = this.actions$.pipe(ofType(ActionTypes.Logout), switchMap(() => {
        this.tokenService.deleteToken();
        return empty;
    }));

    constructor(
        private actions$: Actions,
        private service: LoginService,
        private tokenService: TokenService    
    ) {}

    ofType(type: ActionTypes): Observable<ActionTypes> {
        return this.actions$.pipe(ofType(type));
    }

}