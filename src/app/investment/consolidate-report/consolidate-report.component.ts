import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { InvestmentService } from 'src/services/investment.service';
import { AuthService } from 'src/services/auth.service';
import { Subscription } from 'rxjs';
import { MutualFund } from 'src/models/mutual-fund.model';
import { Equity } from 'src/models/equity.model';
import { FixedDeposit } from 'src/models/fixed-deposit.model';
import { RecurringDeposit } from 'src/models/recurring-deposit.model';
import { OtherInvestment } from 'src/models/other-investment';

import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ConsolidateInvestmentReport } from 'src/models/consolidate-investment-report';

@Component({
  selector: 'app-consolidate-report',
  templateUrl: './consolidate-report.component.html',
  styleUrls: ['./consolidate-report.component.css']
})
export class ConsolidateReportComponent implements OnInit, AfterViewInit {
  columnDefs = [];
  rowData = [];

  loggedInUser;
  dsReport = new MatTableDataSource<ConsolidateInvestmentReport>();
  displayedColumns = ['monthYear', 'equityInvested', 'equityCurrent', 'mfInvested', 'mfCurrent', 
                      'fd', 'rd', 'ssy', 'pf', 'cash', 'other'];

  mfSubscription = new Subscription();
  equitySubscription = new Subscription();
  fdSubscription = new Subscription();
  rdSubscription = new Subscription();
  otherSubscription = new Subscription();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private investmentService: InvestmentService, private authService: AuthService) { }

  ngOnInit() {
    this.createColumnDef();
    this.populateRowData();

    this.loggedInUser =  this.authService.getLoggedInUser();   
    this.investmentService.fetchMutualFunds(this.loggedInUser);
    this.investmentService.fetchEquity(this.loggedInUser);
    this.investmentService.fetchFd(this.loggedInUser);
    this.investmentService.fetchRd(this.loggedInUser);
    this.investmentService.fetchOtherInvestments(this.loggedInUser);
    this.createSubscriptions();
  }

  ngAfterViewInit() {
    this.dsReport.sort = this.sort;
    this.dsReport.paginator = this.paginator;
  }

  createColumnDef() {
    this.columnDefs = [
      { headerName: 'Make', field: 'make' },
      { headerName: 'Model', field: 'model' },
      { headerName: 'Price', field: 'price', editable: true }
    ];
  }

  populateRowData() {
    this.rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
  }

  createSubscriptions() {
    // MF Subscription
    this.mfSubscription = this.investmentService.mutualFundChange.subscribe(
      (currentMF: [MutualFund]) => {
        console.log(currentMF);        
      }
    );

    // Equity Subscription
    this.equitySubscription = this.investmentService.equityChange.subscribe(
      (currentEquity: [Equity]) => {
        console.log(currentEquity);
      }
    );

    // Fixed Deposit Subscription
    this.fdSubscription = this.investmentService.fdChange.subscribe(
      (currentFd: [FixedDeposit]) => {
        console.log(currentFd);
      }
    );

    // Fixed Deposit Subscription
    this.rdSubscription = this.investmentService.rdChange.subscribe(
      (currentRD: [RecurringDeposit]) => {
        console.log(currentRD);
      }
    );

    // Other Investment Subscription
    this.otherSubscription = this.investmentService.otherInvestmentChange.subscribe(
      (otherInvestment: [OtherInvestment]) => {
        console.log(otherInvestment);
      }
    );
  }

  ngOnDestroy() {
    if(this.mfSubscription) {
      this.mfSubscription.unsubscribe();
    }
  }

}
