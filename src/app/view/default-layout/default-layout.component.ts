import { Component } from '@angular/core';
import { LoginFacade } from 'src/app/login/state/login.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default-layout.component.html'  
})
export class DefaultComponent {

  constructor(private loginFacade: LoginFacade,
              private router: Router) {}  

  logout() {
    this.loginFacade.logout();
    this.router.navigate(['login']);
  }

}