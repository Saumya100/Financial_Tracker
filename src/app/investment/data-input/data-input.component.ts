import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-data-input',
  templateUrl: './data-input.component.html',
  styleUrls: ['./data-input.component.css']
})
export class DataInputComponent implements OnInit {
  selected = '';
  investmentAreas = ['Equity', 'Mutual Fund', 'Fixed Deposit', 'Recurring Deposit', 'Others'];

  constructor(private commonService: CommonService) { }

  ngOnInit() {
  }

  onSelectionChanged(investmentArea: string){
    console.log(investmentArea);
  }

}
