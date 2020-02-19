import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenService } from '../token/token.service';
import { LoginFacade } from '../login/state/login.facade';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private router: Router, private tokenService: TokenService,
                private loginFacade: LoginFacade) {}

    canActivate(): boolean {                             

        if(this.tokenService.isValidToken()) {
            this.loginFacade.refresh();
            return true;
        }

        // not valid
        this.router.navigate(['login']);
        return false;
    }
}