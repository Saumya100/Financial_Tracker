import { Injectable } from '@angular/core';
import { AuthData } from 'src/models/auth-data.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { InvestmentService } from './investment.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  private loginUser = '';

  constructor(private angularFireAuth: AngularFireAuth, private router: Router,
     private investmentService: InvestmentService) { }

  initAuthListner(){
    this.angularFireAuth.authState.subscribe(
      (user) => {
        if(user) { 
          this.loginUser =user.email;        
          this.router.navigate(['/investment']);
          this.authChange.next(true);
          this.isAuthenticated = true;
        } else {
          this.router.navigate(['/login']);
          this.authChange.next(false);
          this.isAuthenticated = false;
          this.loginUser = ''; 
          this.investmentService.cancelSubscription();
        }
      }
    );
  }

  login(authData: AuthData) {
    this.angularFireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).
      then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  signUp(authData: AuthData){
    this.angularFireAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).
      then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }

  isAuth(){
    return this.isAuthenticated;
  }

  getLoggedInUser() {
    return this.loginUser;
  }
}
