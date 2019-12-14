import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './view/login/login.module';
import { DefaultLayoutModule } from './view/default-layout/default-layout.module';
import { LoginServiceModule } from './login/login.module';

import { StoreModule } from '@ngrx/store';
import { LoginReducer } from './login/login.reducer';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    DefaultLayoutModule,
    LoginServiceModule,
    StoreModule.forRoot({
      login: LoginReducer
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
