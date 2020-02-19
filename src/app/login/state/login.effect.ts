import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { ActionTypes, SuccessfullyLogged, Login, LoginError, InvalidLogin } from './login.actions'
import { LoginService } from '../login.service';
import { AuthenticationToken } from '../login.model';
import { of, Observable, empty, never } from 'rxjs';
import { TokenService } from 'src/app/token/token.service';

@Injectable({
    providedIn: 'root'
})
export class LoginEffects {

    @Effect()
    login$ = this.actions$.pipe(ofType(ActionTypes.Login), switchMap((action: Login) => {               
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
    successfullyLogged$ = this.actions$.pipe(ofType(ActionTypes.SuccessfullyLogged), tap((action: SuccessfullyLogged) => this.tokenService.setToken(action.payload.token)));

    @Effect({
        dispatch: false
    })
    logout$ = this.actions$.pipe(ofType(ActionTypes.Logout), tap(() => this.tokenService.deleteToken()));

    constructor(
        private actions$: Actions,
        private service: LoginService,
        private tokenService: TokenService    
    ) {}

    ofType(type: ActionTypes): Observable<ActionTypes> {
        return this.actions$.pipe(ofType(type));
    }

}