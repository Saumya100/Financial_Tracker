import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DailyExpense } from 'src/models/daily-expense-entry.model';
import { Subscription, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  firebaseSubscription: Subscription[] = [];
  dailyExpenseListChanged = new Subject<DailyExpense[]>();

  constructor(private dbFireStore: AngularFirestore) { }

  addDailyExpense(dailyExpenseRecord: DailyExpense) {
    this.dbFireStore.collection('daily_expense').add(dailyExpenseRecord);
  }

  updateDailyExpense(id: string, dailyExpenseRecord: DailyExpense) {
    // return
    // this.dbFireStore
    //   .collection("daily_expense")
    //   .doc(id)
    //   .set(dailyExpenseRecord);

      this.dbFireStore.doc('daily_expense/' + id).update(dailyExpenseRecord);
  }
 

  fetchDailyExpenseByMonthYear(userId: string, monthYear: number) {
    this.firebaseSubscription.push(
      this.dbFireStore.collection('daily_expense', ref => ref
        .where('userId', '==', userId)
        .where('monthYear', '==', monthYear))
        .snapshotChanges().pipe(map(docArray => {
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              rowData: doc.payload.doc.data()
            };
          });
        })).subscribe((result: any[]) => {          
          this.dailyExpenseListChanged.next([...result]);
          // this.uiService.loadingStateChanged.next(false);
        }, (error) => {
          console.log(error);
          //this.uiService.loadingStateChanged.next(false);
          // this.uiService.openSnackBar('Error While Fetching Exercises', null, 3000);
          this.dailyExpenseListChanged.next(null);
        }));
  }

}
