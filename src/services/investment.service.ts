import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MutualFund } from 'src/models/mutual-fund.model';
import { Subscription, Subject } from 'rxjs';
import { Equity } from 'src/models/equity.model';
import { FixedDeposit } from 'src/models/fixed-deposit.model';
import { RecurringDeposit } from 'src/models/recurring-deposit.model';
import { OtherInvestment } from 'src/models/other-investment';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {  
  firebaseSubscription: Subscription[] = [];
  mutualFundChange= new Subject<MutualFund[]>();
  equityChange= new Subject<Equity[]>();
  fdChange= new Subject<FixedDeposit[]>();
  rdChange= new Subject<RecurringDeposit[]>();
  otherInvestmentChange= new Subject<OtherInvestment[]>();

  constructor(private dbFireStore: AngularFirestore) { }

  addMitualFund(newFund: MutualFund){
    this.dbFireStore.collection('mutualFund').add(newFund);
  }

  fetchMutualFunds(userId: string) {
    this.firebaseSubscription.push(
      this.dbFireStore.collection('mutualFund', ref => ref.where('userId', '==', userId))
      .valueChanges().subscribe(
        (result: MutualFund[]) => {
          this.mutualFundChange.next(result);
        }
      ));
  }

  /// Add and Retrive Equity
  addEquity(equity: Equity){
    this.dbFireStore.collection('equity').add(equity);
  }

  fetchEquity(userId: string) {
    this.firebaseSubscription.push(
      this.dbFireStore.collection('equity', ref => ref.where('userId', '==', userId))
      .valueChanges().subscribe(
        (result: Equity[]) => {
          this.equityChange.next(result);
        }
      ));
  }

  /// Add and retrive Fixed Deposit
  addFD(fd: FixedDeposit){
    this.dbFireStore.collection('fixed_deposit').add(fd);
  }

  fetchFd(userId: string) {
    this.firebaseSubscription.push(
      this.dbFireStore.collection('fixed_deposit', ref => ref.where('userId', '==', userId))
      .valueChanges().subscribe(
        (result: FixedDeposit[]) => {
          this.fdChange.next(result);
        }
      ));
  }

  /// Add and retrive Fixed Deposit
  addRd(rd: RecurringDeposit){
    this.dbFireStore.collection('recurring_deposit').add(rd);
  }

  fetchRd(userId: string) {
    this.firebaseSubscription.push(
      this.dbFireStore.collection('recurring_deposit', ref => ref.where('userId', '==', userId))
      .valueChanges().subscribe(
        (result: RecurringDeposit[]) => {
          this.rdChange.next(result);          
        }
      ));
  }

  /// Add and Retrive Other Investments
  addOtherInvestment(otherInvestment: OtherInvestment){
    this.dbFireStore.collection('otherInvestment').add(otherInvestment);
  }

  fetchOtherInvestments(userId: string) {
    this.firebaseSubscription.push(
      this.dbFireStore.collection('otherInvestment', ref => ref.where('userId', '==', userId))
      .valueChanges().subscribe(
        (result: OtherInvestment[]) => {
          this.otherInvestmentChange.next(result);
        }
      ));
  }


  cancelSubscription() {
    this.firebaseSubscription.forEach(element => {
      element.unsubscribe()
    });
  }
}
