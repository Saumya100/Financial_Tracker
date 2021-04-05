import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { InvestmentComponent } from './investment/investment.component';
import { DailyExpenseComponent } from './daily-expense/daily-expense.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth-guard';


const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'daily-expense', component: DailyExpenseComponent, canActivate: [AuthGuard]},
  {path: 'investment', component: InvestmentComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
