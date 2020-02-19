import { Action } from '@ngrx/store';
import { UserAuthentication, AuthenticationToken } from '../login.model';


export enum ActionTypes {
    Login = '[Login] Login',
    LoginError = '[Login] LoginError',
    InvalidLogin = '[Login] InvalidLogin',
    SuccessfullyLogged = '[Login] SuccessfullyLogged',
    Logout = '[Login] Logout',
    Refresh = '[Login] Refresh',
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

export class InvalidLogin implements Action {
    readonly type = ActionTypes.InvalidLogin;
    constructor(){}
}

export class Logout implements Action {
    readonly type = ActionTypes.Logout;
    constructor() {}
}

export class Refresh implements Action {
    readonly type = ActionTypes.Refresh;
    constructor() {}
}

export type LoginActions = Login | LoginError | SuccessfullyLogged | Logout | InvalidLogin | Refresh;