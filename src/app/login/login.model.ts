export class UserAuthentication {
    constructor(public username: string, public password: string) {}
}

export interface AuthenticateResponse {
    message: string;
    success: boolean;
    data: AuthenticationToken;
}

export interface AuthenticationToken {
    token: string;
}