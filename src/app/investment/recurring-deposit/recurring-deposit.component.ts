import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { InvestmentService } from 'src/services/investment.service';
import { Constant } from 'src/models/constant.model';
import { RecurringDeposit } from 'src/models/recurring-deposit.model';

@Component({
  selector: 'app-recurring-deposit',
  templateUrl: './recurring-deposit.component.html',
  styleUrls: ['./recurring-deposit.component.css']
})
export class RecurringDepositComponent implements OnInit {
  months = Constant.MONTHS;
  maxDate;
  minDate;
  rdForm: FormGroup;
  constructor(private authService: AuthService, private investmentService: InvestmentService) { }

  ngOnInit() {
    this.createForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);
    this.minDate = new Date();
  }

  createForm(){
    this.rdForm = new FormGroup({
      userId: new FormControl(this.authService.getLoggedInUser()),
      year: new FormControl('', {validators: [Validators.required] }),
      month: new FormControl(Number, {validators: [Validators.required] }),
      place: new FormControl('', {validators: [Validators.required] }),
      investedAmt: new FormControl(0, {validators: [Validators.required] }),
      currentAmt: new FormControl(0, {validators: [Validators.required] }),
      maturityAmt: new FormControl(0, {validators: [Validators.required] }),
      maturityDate: new FormControl(Date, {validators: [Validators.required] }),
      purpose: new FormControl(''),
      isActive: new FormControl(true, {validators: [Validators.required] }),
      createdOn: new FormControl(new Date())
    });
  }

  onSubmit() {
    console.log(this.rdForm);
    let rd: RecurringDeposit = this.rdForm.value;
    rd.createdOn = new Date();
    this.investmentService.addRd(rd);
  }


}
