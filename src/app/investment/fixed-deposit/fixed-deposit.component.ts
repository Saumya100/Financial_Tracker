import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { InvestmentService } from 'src/services/investment.service';
import { Constant } from 'src/models/constant.model';
import { FixedDeposit } from 'src/models/fixed-deposit.model';

@Component({
  selector: 'app-fixed-deposit',
  templateUrl: './fixed-deposit.component.html',
  styleUrls: ['./fixed-deposit.component.css']
})
export class FixedDepositComponent implements OnInit {
  maxDate;
  minDate;
  fdForm: FormGroup;
  constructor(private authService: AuthService, private investmentService: InvestmentService) { }

  ngOnInit() {
    this.createForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);
    this.minDate = new Date();
  }

  createForm(){
    this.fdForm = new FormGroup({
      userId: new FormControl(this.authService.getLoggedInUser()),
      place: new FormControl('', {validators: [Validators.required] }),
      investedAmt: new FormControl(0, {validators: [Validators.required] }),
      maturityAmt: new FormControl(0, {validators: [Validators.required] }),
      maturityDate: new FormControl(Date, {validators: [Validators.required] }),
      purpose: new FormControl(''),
      isActive: new FormControl(true, {validators: [Validators.required] }),
      createdOn: new FormControl(new Date())
    });
  }

  onSubmit() {
    console.log(this.fdForm);
    let fd: FixedDeposit = this.fdForm.value;
    fd.createdOn = new Date();
    this.investmentService.addFD(fd);
  }

}
