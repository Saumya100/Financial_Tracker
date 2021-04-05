import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { Equity } from 'src/models/equity.model';
import { Constant } from 'src/models/constant.model';
import { InvestmentService } from 'src/services/investment.service';


@Component({
  selector: 'app-equity',
  templateUrl: './equity.component.html',
  styleUrls: ['./equity.component.css']
})
export class EquityComponent implements OnInit {

  months = Constant.MONTHS;
  equityForm: FormGroup;
  constructor(private authService: AuthService, private investmentService: InvestmentService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.equityForm = new FormGroup({
      userId: new FormControl(this.authService.getLoggedInUser()),
      year: new FormControl('', {validators: [Validators.required] }),
      month: new FormControl(Number, {validators: [Validators.required] }),
      investedAmt: new FormControl(0, {validators: [Validators.required] }),
      currentAmt: new FormControl(0, {validators: [Validators.required] }),
      createdOn: new FormControl(Date)
    });
  }

  onSubmit() {
    console.log(this.equityForm);
    let equity: Equity = this.equityForm.value;
    equity.createdOn = new Date();
    this.investmentService.addEquity(equity);
  }
}
