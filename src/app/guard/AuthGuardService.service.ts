import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenService } from '../token/token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private router: Router, private tokenService: TokenService) {}

    canActivate(): boolean {         
        if(this.tokenService.isValidToken())
            return true;
        // not valid
        this.router.navigate(['login']);
        return false;
    }
}