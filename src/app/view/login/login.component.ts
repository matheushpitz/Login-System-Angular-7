import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthentication } from 'src/app/login/login.model';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ActionTypes } from 'src/app/login/state/login.actions';
import { LoginEffects } from 'src/app/login/state/login.effect';
import { TokenService } from 'src/app/token/token.service';
import { LoginFacade } from 'src/app/login/state/login.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'  
})
export class LoginComponent {

  private subs: Subscription[] = [];
  private login$: Observable<any>;

  constructor(private router: Router, private store: Store<any>, private effect: LoginEffects,
              private facade: LoginFacade) {
    this.login$ = store.pipe(select('login'));    
    
    this.subs.push(this.effect.ofType(ActionTypes.SuccessfullyLogged).subscribe(() => {                  
      this.router.navigate(['home']);
    }));

    this.subs.push(this.effect.ofType(ActionTypes.InvalidLogin).subscribe(() => {
      alert('Invalid username or password.');
    }));

    this.subs.push(this.effect.ofType(ActionTypes.LoginError).subscribe(() => {
      alert('Error when tried to login.');
    }));
  }

  ngOnDestroy() {    
    this.subs.forEach(s => s.unsubscribe());
  }

  logIn(data) {           
    this.facade.authenticate(new UserAuthentication(data.value.username, data.value.password)); 
  }

}
