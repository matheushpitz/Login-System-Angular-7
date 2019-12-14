import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { UserAuthentication } from 'src/app/login/login.model';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Login } from 'src/app/login/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'  
})
export class LoginComponent {

  private subs: Subscription[] = [];
  private login$: Observable<any>;

  constructor(private router: Router, private service: LoginService, private store: Store<any>) {
    this.login$ = store.pipe(select('login'));    
  }

  ngOnDestroy() {
    console.log('destroying');
    this.subs.forEach(s => s.unsubscribe());
  }

  logIn(data) {    
    // data.valid -> to validations.
    this.subs.push(this.service.authenticate(new UserAuthentication(data.value.username, data.value.password)).subscribe(res => {
      if(res.token != null && res.token.length > 0) {
        this.router.navigate(['/home']);
      } else {
        alert('Username or password given are wrong.');
      }
    }));
  }

}
