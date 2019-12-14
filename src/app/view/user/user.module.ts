import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UserAdd } from './user-add.component';
import { UserList } from './user-list.component';

@NgModule({
  declarations: [
    UserAdd,
    UserList
  ],
  imports: [
    BrowserModule,      
  ],
  exports: [
    UserAdd,
    UserList
  ],
  providers: []
})
export class UserModule { }
