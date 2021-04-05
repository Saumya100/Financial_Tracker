import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  loginUser: string;
  authSubscription : Subscription;
  loginUserSubscription: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
        this.loginUser = this.authService.getLoggedInUser();
      }
    );

    this.loginUser = this.authService.getLoggedInUser();
    console.log("Login User: " + this.loginUser);
  }

  onLogout(){
    this.authService.logout();
  }

  onToggleSideNav(){

  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
    this.loginUserSubscription.unsubscribe();
  }

}
