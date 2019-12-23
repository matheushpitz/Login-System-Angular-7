import { NgModule } from '@angular/core';
import { HttpAPI } from './http.service';

@NgModule({
    providers: [
        HttpAPI
    ]
})
export class HttpAPIModule {

}