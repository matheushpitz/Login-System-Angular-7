import { NgModule } from '@angular/core';
import { LoginService } from './login.service';
import { LoginFacade } from './login.facade';

@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [LoginService, LoginFacade]
  })
  export class LoginServiceModule { }