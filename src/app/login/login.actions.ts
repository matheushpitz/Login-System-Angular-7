import { Action } from '@ngrx/store';
import { UserAuthentication, AuthenticationToken } from './login.model';


export enum ActionTypes {
    Login = '[Login] Login',
    LoginError = '[Login] LoginError',
    SuccessfullyLogged = '[Login] SuccessfullyLogged',
    Logout = '[Login] Logout'
}

export class Login implements Action {
    readonly type = ActionTypes.Login;
    constructor(public payload: UserAuthentication) {}
}

export class LoginError implements Action {
    readonly type = ActionTypes.LoginError;
    constructor() {}
}

export class SuccessfullyLogged implements Action {
    readonly type = ActionTypes.SuccessfullyLogged;
    constructor(public payload: AuthenticationToken) {}
}

export class Logout implements Action {
    readonly type = ActionTypes.Logout;
    constructor() {}
}

export type LoginActions = Login | LoginError | SuccessfullyLogged | Logout;