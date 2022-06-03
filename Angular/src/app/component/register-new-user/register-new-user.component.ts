import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
// import * as alertify from 'alertify.js';
import { Users } from '../../models/users';
import { LoginResponse } from 'src/app/models/loginResponse';

@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.css']
})

export class RegisterNewUserComponent implements OnInit {

  regNewUser = new Users;
  signupForm: FormGroup;

  emptyUserName = 'You must enter a username';
  minlengthUserName = 'User name must be at least 3 characters long';
  maxlengthUserName = 'Username cannot exceed 20 characters';
  userNamePattern = 'Username should be in alphanumeric only';

  emptyPassword = 'You must enter a password';
  minlengthPassword = 'Password must be at least 8 characters long';
  maxlengthPassword = 'Password cannot exceed 20 characters';
  passwordPattern = 'Pattern does not match';

  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';

  constructor(private route: Router, private dataService: DataService) {
  }

  ngOnInit() {

    // add necessary validators

    this.signupForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[a-zA-Z0-9_]*$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]{10}$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      location: new FormControl('', Validators.required)
    });
  }

  signUp() {

    // call regNewUser method to perform signup operation

    if (this.signupForm.invalid) {
      return;
    }

    this.regNewUser.user_name = this.getFormValue("userName");
    this.regNewUser.password = this.signupForm.get("password").value;
    this.regNewUser.location = this.signupForm.get("location").value;
    this.regNewUser.user_mobile = this.signupForm.get("mobile").value;
    this.regNewUser.user_email = this.signupForm.get("email").value;


    let loginResponse: LoginResponse;
    this.dataService.regNewUser(this.regNewUser)?.subscribe(res => {
      loginResponse = (<LoginResponse>res);
      console.log(loginResponse)
      console.log(loginResponse.success)
      if (loginResponse?.success) {
        // if success, redirect to login page
        this.route.navigateByUrl('/login')
      } else {
        // else display appropriate error message
        this.route.navigateByUrl('/login')
      }
      // reset the form
    },
      (error) => {
  
      })



  }

  getFormValue(fieldname: string): string {
    return this.signupForm.get(fieldname).value;
  }

  goBack() {

    // should navigate to login page
    this.route.navigate(['/login'])

  }


}
