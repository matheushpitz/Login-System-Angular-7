import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DefaultComponent } from './default-layout.component';
import { DefaultLayourRoutingModule } from './default-layout-routing.module';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [
    DefaultComponent
  ],
  imports: [
    BrowserModule,  
    DefaultLayourRoutingModule,  
    UserModule
  ],
  exports: [
    DefaultComponent
  ],
  providers: []
})
export class DefaultLayoutModule { }
