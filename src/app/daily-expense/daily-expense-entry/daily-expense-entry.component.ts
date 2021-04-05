import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/models/constant.model';
import { GridOptions } from 'ag-grid-community';
import { DailyExpense } from 'src/models/daily-expense-entry.model';
import { ExpenseService } from 'src/services/expense.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-daily-expense-entry',
  templateUrl: './daily-expense-entry.component.html',
  styleUrls: ['./daily-expense-entry.component.css']
})
export class DailyExpenseEntryComponent implements OnInit {

  months = Constant.MONTHS;
  selectedYear;
  selectedMonth;
  selectedMonthYear;
  loggedInUser = '';
  gridOptions: GridOptions;
  rowData:DailyExpense[] = [];
  columnDefs=[];
  daysInMonth: number;
  arrayDays = [];
  cellStyle = {border: 'solid', borderTopWidth: '0px', borderRightWidth: '0.5px', borderLeftWidth: '0px', borderBottomWidth: '0.5px'}
  monthCellStyle = {'background-color':'lightgrey', border: 'solid', borderTopWidth: '0px', borderRightWidth: '0.5px', borderLeftWidth: '0.5px', borderBottomWidth: '0.5px'}

  dailyExpenseListByMonthYear: any[] = [];

  totalExpense: DailyExpense;
  // defaultCalculationRow: DailyExpense;
  
  constructor(private authService: AuthService, private expenseService: ExpenseService) { 
    this.gridOptions = <GridOptions>{
      context: {
          componentParent: this
      }
  };
   // this.gridOptions.rowData = this.populateRowData();
   //this.gridOptions.columnDefs = this.createColumnDef();
   
  }

  ngOnInit() { 
    this.loggedInUser = this.authService.getLoggedInUser(); 
    this.totalExpense = {
      userId: this.loggedInUser,
      date: 'Total',
      grocery: 0,
      vegitable: 0,
      meat: 0,
      mobile: 0,
      transport: 0,
      bike: 0,
      shopping: 0,
      food: 0,
      room: 0,
      medical: 0,
      study: 0,
      other: 0,
      calculationRow: true
    }

    var currentDate = new Date(); 
    this.selectedMonth = currentDate.getMonth() + 1; 
    this.selectedYear = currentDate.getFullYear();
    this.selectedMonthYear = parseInt(`${this.selectedMonth.toString()}${this.selectedYear.toString()}`);

    this.expenseService.fetchDailyExpenseByMonthYear(this.loggedInUser, this.selectedMonthYear);
        
    this.expenseService.dailyExpenseListChanged.subscribe(
      (newDailyExpenseList) => {
        this.dailyExpenseListByMonthYear = newDailyExpenseList;
        this.populateRowData(); 
        this.gridOptions.api.setRowData(this.rowData);
      }
    )
    this.createColumnDef();     
  }

  onSelectionChanged(event: any){
    this.selectedMonthYear = parseInt(`${this.selectedMonth.toString()}${this.selectedYear.toString()}`);

    this.expenseService.fetchDailyExpenseByMonthYear(this.loggedInUser, this.selectedMonthYear);
  }

  createColumnDef() {
    this.columnDefs = [
      { headerName: 'Date', field: 'date', width: 100, cellStyle: this.monthCellStyle},
      { headerName: 'Grocery', field: 'grocery', editable: true,  width: 100, cellStyle: this.cellStyle },
      { headerName: 'Vegitable/Fruits', field: 'vegitable', editable: true, width: 100, cellStyle: this.cellStyle },
      { headerName: 'Meat/Fish/Egg/Milk', field: 'meat', editable: true, width: 100, cellStyle: this.cellStyle },
      { headerName: 'Mobile/Net', field: 'mobile', editable: true, width: 100, cellStyle: this.cellStyle },
      { headerName: 'Transport', field: 'transport', editable: true, width: 100, cellStyle: this.cellStyle },
      { headerName: 'Bike', field: 'bike', editable: true, width: 100, cellStyle: this.cellStyle },
      { headerName: 'Shopping', field: 'shopping', editable: true, width: 100, cellStyle: this.cellStyle },
      { headerName: 'Food', field: 'food', editable: true, width: 100, cellStyle: this.cellStyle },
      { headerName: 'Room', field: 'room', editable: true, width: 100, cellStyle: this.cellStyle },
      { headerName: 'Medical', field: 'medical', editable: true, width: 100, cellStyle: this.cellStyle },
      { headerName: 'Study/School', field: 'study', editable: true, width: 100, cellStyle: this.cellStyle },
      { headerName: 'Others', field: 'other', editable: true, width: 100, cellStyle: this.cellStyle }
    ];
  }

  populateRowData() {
    if(this.dailyExpenseListByMonthYear && this.dailyExpenseListByMonthYear.length > 0) {
      this.populateExistingDataEntryRow();
    } else {
      this.addNewDataEntryRow();
    }

    // Inserting Total Row    
    this.rowData.push(this.totalExpense);
    // inserting Limit Row
    Constant.LIMIT_EXPENSE_TOTAL.userId = this.loggedInUser;
    this.rowData.push(Constant.LIMIT_EXPENSE_TOTAL);

    // Inserting Remaining Balance row
    let defaultRemainingRow: DailyExpense = {
      userId: this.loggedInUser,
      date: 'Remaining',
      calculationRow: true
    }
    
    this.rowData.push(defaultRemainingRow);

    this.calculateTotalByType();
  }

  addNewDataEntryRow(){
    var currentDate = new Date(); 
    var month = currentDate.getMonth(); 
    var year = currentDate.getFullYear();
    let date = new Date(year, month, 1);

    while (date.getMonth() === month) {
      this.arrayDays.push(this.getDateOnly(date));
      date.setDate(date.getDate() + 1);
    }
        
    for (let index = 0; index < this.arrayDays.length; index++) {
      this.rowData.push({           
        userId: this.loggedInUser,
        date: this.arrayDays[index],
        monthYear: this.selectedMonthYear,
        grocery: null,
        vegitable: null,
        meat: null,
        mobile: null,
        transport: null,
        bike: null,
        shopping: null,
        food: null,
        room: null,
        medical: null,
        study: null,
        other: null,
        calculationRow: false
      });  
    }
  }

  populateExistingDataEntryRow(){
    this.rowData = [];
    this.dailyExpenseListByMonthYear.forEach(element => {
      this.rowData.push(element.rowData);
    });
    
    this.rowData.sort((a, b) => {
      if(this.convertDateStringToNumber(a.date.toString()) > this.convertDateStringToNumber(b.date.toString())) {
        return 1;
      } else if(this.convertDateStringToNumber(a.date.toString()) < this.convertDateStringToNumber(b.date.toString())) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  convertDateStringToNumber(dateString: string): number {
    let numbers = dateString.split('-');
    let numberString = '';
    numbers.forEach(element => {
      numberString += element; 
    });
    return parseInt(numberString);;
  }

  calculateTotalByType() {    
    var index = this.rowData.findIndex(x => x.date === this.totalExpense.date);

    Object.keys(this.rowData[index]).forEach((key)=> {
      if (!(key === 'userId' || key === 'date' || key === 'calculationRow')) {
        this.rowData[index][key] = this.sumOfExpense(this.rowData, key);
      }      
    });
    this.totalExpense = this.rowData[index];    
    this.calculateRemaingByType()
  }

  calculateRemaingByType() {    
    var index = this.rowData.findIndex(x => x.date === 'Remaining');
    
    this.rowData[index].grocery =  Constant.LIMIT_EXPENSE_TOTAL.grocery - this.totalExpense.grocery;
    this.rowData[index].vegitable = Constant.LIMIT_EXPENSE_TOTAL.vegitable - this.totalExpense.vegitable;
    this.rowData[index].meat =  Constant.LIMIT_EXPENSE_TOTAL.meat - this.totalExpense.meat;
    this.rowData[index].mobile =  Constant.LIMIT_EXPENSE_TOTAL.mobile - this.totalExpense.mobile;
    this.rowData[index].transport =  Constant.LIMIT_EXPENSE_TOTAL.transport - this.totalExpense.transport;
    this.rowData[index].bike =  Constant.LIMIT_EXPENSE_TOTAL.bike - this.totalExpense.bike;
    this.rowData[index].shopping =  Constant.LIMIT_EXPENSE_TOTAL.shopping - this.totalExpense.shopping;
    this.rowData[index].food =  Constant.LIMIT_EXPENSE_TOTAL.food - this.totalExpense.food;
    this.rowData[index].room =  Constant.LIMIT_EXPENSE_TOTAL.room - this.totalExpense.room;
    this.rowData[index].medical =  Constant.LIMIT_EXPENSE_TOTAL.medical - this.totalExpense.medical;
    this.rowData[index].study =  Constant.LIMIT_EXPENSE_TOTAL.study - this.totalExpense.study;
    this.rowData[index].other =  Constant.LIMIT_EXPENSE_TOTAL.other - this.totalExpense.other;
  }

  getDateOnly(date: any): string{
    const _date = new Date(date);
    return `${_date.getDate()}-${_date.getMonth() + 1}-${_date.getFullYear()}`;      
  };

  sumOfExpense(arrayItem: DailyExpense[], field: string): number{
    let val = 0;
    arrayItem.forEach(element => {
      if (!element.calculationRow) {
        if (element[field]) {
          val = val + parseInt(element[field].toString(), 10)
        }
      }
    });

    return val;
  }

  onCellValueChanged(event: any){
    this.calculateTotalByType();
    this.gridOptions.api.setRowData(this.rowData);
  }

  saveExpense() {
    this.rowData.forEach(element => {
      let existingRow = this.dailyExpenseListByMonthYear.find(r => r.rowData.date === element.date);
      if(existingRow){
        this.expenseService.updateDailyExpense(existingRow.id, element);
      } else {
        if(!element.calculationRow) {
          this.expenseService.addDailyExpense(element);
        }
      }      
    });
  }

}
