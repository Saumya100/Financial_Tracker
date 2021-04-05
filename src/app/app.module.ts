import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsService } from 'src/services/products.service';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { DailyExpenseComponent } from './daily-expense/daily-expense.component';
import { InvestmentComponent } from './investment/investment.component';
import { ConsolidateReportComponent } from './investment/consolidate-report/consolidate-report.component';
import { DataInputComponent } from './investment/data-input/data-input.component';
import { AgGridModule } from 'ag-grid-angular';
import { MutualFundComponent } from './investment/mutual-fund/mutual-fund.component';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SideNavComponent } from './navigation/side-nav/side-nav.component'
import { AuthService } from 'src/services/auth.service';
import { InvestmentService } from 'src/services/investment.service';
import { DetailsReportComponent } from './investment/details-report/details-report.component';
import { EquityComponent } from './investment/equity/equity.component';
import { FixedDepositComponent } from './investment/fixed-deposit/fixed-deposit.component';
import { RecurringDepositComponent } from './investment/recurring-deposit/recurring-deposit.component';
import { OtherInvestmentComponent } from './investment/other-investment/other-investment.component';
import { DailyExpenseEntryComponent } from './daily-expense/daily-expense-entry/daily-expense-entry.component';
import { MonthlyExpenseReportComponent } from './daily-expense/monthly-expense-report/monthly-expense-report.component';
import { TesComponent } from './test/tes/tes.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DailyExpenseComponent,
    InvestmentComponent,
    ConsolidateReportComponent,
    DataInputComponent,
    MutualFundComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    SideNavComponent,
    DetailsReportComponent,
    EquityComponent,
    FixedDepositComponent,
    RecurringDepositComponent,
    OtherInvestmentComponent,
    DailyExpenseEntryComponent,
    MonthlyExpenseReportComponent,
    TesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AgGridModule.withComponents([]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [ProductsService, AuthService, InvestmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
