import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private tokenService: TokenService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | Observable<never> {
        let headers = req.headers;
        // Used to cancel a request.
        //return EMPTY;
        if(this.tokenService.hasToken()) {            
            return next.handle(req.clone({headers: headers.append('Authorization', 'Bearer ' + this.tokenService.getRawToken())}));
        }               
        return next.handle(req);
    }

}