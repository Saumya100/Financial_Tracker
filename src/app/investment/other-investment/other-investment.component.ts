import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { InvestmentService } from 'src/services/investment.service';
import { Constant} from 'src/models/constant.model';
import { OtherInvestment } from 'src/models/other-investment';

@Component({
  selector: 'app-other-investment',
  templateUrl: './other-investment.component.html',
  styleUrls: ['./other-investment.component.css']
})
export class OtherInvestmentComponent implements OnInit {

  months = Constant.MONTHS;
  otherInvestments = Constant.OTHER_INVESTMENTS;
  otherInvForm: FormGroup;
  constructor(private authService: AuthService, private investmentService: InvestmentService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.otherInvForm = new FormGroup({
      userId: new FormControl(this.authService.getLoggedInUser()),
      year: new FormControl('', {validators: [Validators.required] }),
      month: new FormControl(Number, {validators: [Validators.required] }),
      category: new FormControl('', {validators: [Validators.required] }),
      investedAmt: new FormControl(0, {validators: [Validators.required] }),
      createdOn: new FormControl(Date)
    });
  }

  onSubmit() {
    console.log(this.otherInvForm);
    let otherInvestment: OtherInvestment = this.otherInvForm.value;
    otherInvestment.createdOn = new Date();
    this.investmentService.addOtherInvestment(otherInvestment);
  }

}
