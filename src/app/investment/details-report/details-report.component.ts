import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MutualFund } from 'src/models/mutual-fund.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { InvestmentService } from 'src/services/investment.service';
import { AuthService } from 'src/services/auth.service';
import { Equity } from 'src/models/equity.model';
import { FixedDeposit } from 'src/models/fixed-deposit.model';
import { RecurringDeposit } from 'src/models/recurring-deposit.model';
import { OtherInvestment } from 'src/models/other-investment';

@Component({
  selector: 'app-details-report',
  templateUrl: './details-report.component.html',
  styleUrls: ['./details-report.component.css']
})
export class DetailsReportComponent implements OnInit, OnDestroy, AfterViewInit {
  loggedInUser;
  showMF = false;

  // mutualFunds: MutualFund[] = [];
  mfSubscription = new Subscription();
  dsMutualFund = new MatTableDataSource<MutualFund>();
  displayedColumns = ['year', 'month', 'platform', 'investedAmt', 'currentAmt'];

  // equity: Equity[] = [];
  equitySubscription = new Subscription();
  dsEquity = new MatTableDataSource<Equity>();
  displayedColsEquity = ['year', 'month', 'investedAmt', 'currentAmt'];

  fdSubscription = new Subscription();
  dsFD = new MatTableDataSource<FixedDeposit>();
  displayedColsFD = ['year', 'month', 'place', 'investedAmt', 'maturityAmt', 'purpose'];

  rdSubscription = new Subscription();
  dsRD = new MatTableDataSource<RecurringDeposit>();
  displayedColsRD = ['year', 'month', 'investedAmt', 'currentAmt', 'maturityAmt', 'purpose'];

  otherSubscription = new Subscription();
  dsOthers = new MatTableDataSource<OtherInvestment>();
  displayedColsOthers = ['year', 'month', 'category', 'investedAmt'];  

  
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  constructor(private investmentService: InvestmentService, private authService: AuthService) { }

  ngOnInit() {
    this.loggedInUser =  this.authService.getLoggedInUser();   
    // this.investmentService.fetchMutualFunds(this.loggedInUser);
    // this.investmentService.fetchEquity(this.loggedInUser);
    // this.investmentService.fetchFd(this.loggedInUser);
    // this.investmentService.fetchRd(this.loggedInUser);
    // this.investmentService.fetchOtherInvestments(this.loggedInUser);
    // this.createSubscriptions();
  }  

  ngAfterViewInit() {
    this.dsMutualFund.sort = this.sort.toArray()[0];
    this.dsMutualFund.paginator = this.paginator.toArray()[0];
    
    this.dsEquity.sort = this.sort.toArray()[1];
    this.dsEquity.paginator = this.paginator.toArray()[1];
  }

  createSubscriptions() {
    // MF Subscription
    this.mfSubscription = this.investmentService.mutualFundChange.subscribe(
      (currentMF: [MutualFund]) => {
        console.log(currentMF);
        this.dsMutualFund.data = currentMF;
      }
    );

    // Equity Subscription
    this.equitySubscription = this.investmentService.equityChange.subscribe(
      (currentEquity: [Equity]) => {
        console.log(currentEquity);
        this.dsEquity.data = currentEquity;
      }
    );

    // Fixed Deposit Subscription
    this.fdSubscription = this.investmentService.fdChange.subscribe(
      (currentFd: [FixedDeposit]) => {
        console.log(currentFd);
        this.dsFD.data = currentFd;
      }
    );

    // Fixed Deposit Subscription
    this.rdSubscription = this.investmentService.rdChange.subscribe(
      (currentRD: [RecurringDeposit]) => {
        console.log(currentRD);
        this.dsRD.data = currentRD;
      }
    );

    // Other Investment Subscription
    this.otherSubscription = this.investmentService.otherInvestmentChange.subscribe(
      (otherInvestment: [OtherInvestment]) => {
        console.log(otherInvestment);
        this.dsOthers.data = otherInvestment;
      }
    );
  }

  ngOnDestroy() {
    if(this.mfSubscription) {
      this.mfSubscription.unsubscribe();
    }
  }

  showMFReport(){
    
  }

}
