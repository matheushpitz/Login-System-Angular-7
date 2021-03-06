import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './view/login/login.module';
import { DefaultLayoutModule } from './view/default-layout/default-layout.module';
import { LoginServiceModule } from './login/login.module';
import { HttpAPIModule } from './http/http.module';

import { StoreModule } from '@ngrx/store';
import { LoginReducer } from './login/state/login.reducer';

import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './login/state/login.effect';
import { InterceptorsModule } from './interceptors/interceptors.module';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule,
    DefaultLayoutModule,
    LoginServiceModule,
    StoreModule.forRoot({
      login: LoginReducer
    }),
    EffectsModule.forRoot([LoginEffects]),
    HttpAPIModule,
    InterceptorsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
