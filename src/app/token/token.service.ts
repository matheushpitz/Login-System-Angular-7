import { Injectable } from '@angular/core';

export interface TokenBody {
    nbf: number;
    exp: number;
    iat: number;
}

export interface TokenHeader {
    alg: string;
    typ: string;
}

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private getCurrentTime(): number {
        let currentTime: string = (new Date()).getTime().toString();
        return Number(currentTime.substr(0, currentTime.length - 3));
    }

    setToken(token: string) {
        localStorage.setItem('raw_token', token);

        let tokenParts = token.split('.');

        localStorage.setItem('token_header', atob(tokenParts[0]));
        localStorage.setItem('token_body', atob(tokenParts[1]));
    }

    deleteToken() {
        localStorage.removeItem('raw_token');
        localStorage.removeItem('token_header');
        localStorage.removeItem('token_body');
    }

    getRawToken(): string {
        return localStorage.getItem('raw_token');
    }

    getTokenHeader(): TokenHeader {
        return JSON.parse(localStorage.getItem('token_header'));
    }

    getTokenBody(): TokenBody {
        return JSON.parse(localStorage.getItem('token_body'));
    }

    hasToken(): boolean {
        return localStorage.getItem('raw_token') != null;
    }

    isValidToken(): boolean {
        if(this.hasToken()) {
            let body = this.getTokenBody();            
            let currentTime = this.getCurrentTime();            
            return body.nbf <= currentTime && body.exp >= currentTime;
        }        
        return false;        
    }

    getTimeToExpire(): number{
        if(this.hasToken()) {
            let body = this.getTokenBody();
            let currentTime = this.getCurrentTime();
            return body.exp - currentTime;
        }

        return -1;
    }

}