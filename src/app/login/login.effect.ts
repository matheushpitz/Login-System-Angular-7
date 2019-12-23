import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { ActionTypes, SuccessfullyLogged } from './login.actions'

@Injectable()
export class LoginEffects {

    @Effect()
    login$ = this.actions$.pipe(ofType(ActionTypes.Login), map(l => {
        console.log(l);
        return new SuccessfullyLogged(undefined);
    }));

    constructor(
        private actions$: Actions      
    ) {}

}