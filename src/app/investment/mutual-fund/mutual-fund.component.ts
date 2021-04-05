import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { InvestmentService } from 'src/services/investment.service';
import { MutualFund } from 'src/models/mutual-fund.model';
import { Constant } from 'src/models/constant.model';
import { MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/services/common.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-mutual-fund',
  templateUrl: './mutual-fund.component.html',
  styleUrls: ['./mutual-fund.component.css']
})
export class MutualFundComponent implements OnInit {

  months = Constant.MONTHS;
  mfPlatforms = Constant.MF_PLATFORMS;
  mfForm: FormGroup;

  constructor(private investmentService: InvestmentService, private commonService: CommonService,
    private authService: AuthService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.mfForm = new FormGroup({
      userId: new FormControl(this.authService.getLoggedInUser()),
      year: new FormControl('', {validators: [Validators.required] }),
      month: new FormControl(Number, {validators: [Validators.required] }),
      platform: new FormControl('', {validators: [Validators.required] }),
      investedAmt: new FormControl(0, {validators: [Validators.required] }),
      currentAmt: new FormControl(0, {validators: [Validators.required] }),
      createdOn: new FormControl(Date)
    });
  }

  onSubmit() {
    let mutualFund: MutualFund = this.mfForm.value;
    mutualFund.createdOn = new Date();
    this.investmentService.addMitualFund(mutualFund);
  }

}
