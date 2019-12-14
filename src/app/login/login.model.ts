export class UserAuthentication {
    constructor(public username: string, public password: string) {

    }
}

export class AuthenticationToken {
    constructor(public token: string) {}
}