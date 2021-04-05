import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  currentDate: Date;
  currentTime;
  constructor() { }

  ngOnInit() {
    this.currentDate = new Date();
  }

}
