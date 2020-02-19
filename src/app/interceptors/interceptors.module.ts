import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './tokenInterceptor.service';

@NgModule({
    providers: [        
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }
    ]
})
export class InterceptorsModule {

}