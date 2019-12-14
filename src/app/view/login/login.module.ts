import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  exports: [
      LoginComponent
  ],
  providers: []
})
export class LoginModule { }
