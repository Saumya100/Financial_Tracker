import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tes',
  templateUrl: './tes.component.html',
  styleUrls: ['./tes.component.css']
})
export class TesComponent implements OnInit {

  displayText = 'Welcome back to Angular';
  constructor() { }

  ngOnInit() {
    
  }

}
