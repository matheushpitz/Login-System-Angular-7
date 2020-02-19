import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { TokenService } from '../token/token.service';
import { LoginFacade } from '../login/state/login.facade';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private tokenService: TokenService,
                private loginFacade: LoginFacade) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | Observable<never> {
        console.log(req);
        let headers = req.headers;
        let authorize: boolean = (headers.has('Authorize') && headers.get('Authorize') === 'true');            

        if(authorize) {
            if(this.tokenService.isValidToken()) {
                // must it refresh?
                let refresh: boolean = (headers.has('Refresh') && headers.get('Refresh') === 'true');  
                console.log('refresh = '+refresh);              

                headers = headers.append('Authorization', 'Bearer ' + this.tokenService.getRawToken());

                if(refresh)
                    this.loginFacade.refresh(); 
                    
                return next.handle(req.clone(this.getPureHeaders( headers )));
            }
        } else {
            return next.handle(req.clone(this.getPureHeaders( headers )));
        }                                                   

        // The system will logout, because this request asks for authorize and the jwt token is not valid.
        this.loginFacade.logout();
        // Used to cancel a request.
        return EMPTY;
    }

    private getPureHeaders(headers: HttpHeaders) {
        // Delete headers used inside the interceptor.
        headers = headers.delete('Authorize');    
        headers = headers.delete('Refresh');
        // return an object with headers
        return { headers };
    }

}