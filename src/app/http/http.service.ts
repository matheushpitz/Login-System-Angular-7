import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class HttpAPI {

    constructor(
        private http: HttpClient
    ) {}

    post<T>(path: string, body: any, auth: boolean = true, refresh: boolean = true): Observable<T> {

        let headers = {
            'Content-Type': 'application/json',
            'Authorize': auth ? 'true' : 'false',
            'Refresh': refresh ? 'true' : 'false'
        };        

        return this.http.post<T>(environment.serverHost + path, body, { headers });
    }

    get<T>(path: string, params: any): Observable<T> {
        return this.http.get<T>(environment.serverHost + path, { params });
    }

}