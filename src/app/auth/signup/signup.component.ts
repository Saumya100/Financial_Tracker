import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthData } from 'src/models/auth-data.model';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  signupForm: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]} ),
      password: new FormControl('', {validators: [Validators.required]} )
    });
  }

  registerUser(){
    let authData: AuthData = this.signupForm.value; 
    this.authService.signUp(authData);
  }

}
