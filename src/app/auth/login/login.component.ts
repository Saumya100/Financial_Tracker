import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthData } from 'src/models/auth-data.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  loginForm: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]} ),
      password: new FormControl('', {validators: [Validators.required]} )
    });
  }

  onSubmit(){
    let authData: AuthData = this.loginForm.value; 
    this.authService.login(authData);
  }

}
