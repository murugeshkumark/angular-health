import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/loginResponse';
import { ApiService } from '../../services/api.service';

import { DataService } from '../../services/data.service';
// import * as alertify from 'alertify.js';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	isLoggedIn: boolean = false;
	loginForm: FormGroup;
	isLoginFailed: boolean = false;

	emptyUserName = 'You must enter a username';
	minlengthUserName = 'User name must be at least 3 characters long';
	maxlengthUserName = 'Username cannot exceed 20 characters';
	userNamePattern = 'Username should be in alphanumeric only';

	emptyPassword = 'You must enter a password';
	minlengthPassword = 'Password must be at least 8 characters long';
	maxlengthPassword = 'Password cannot exceed 20 characters';
	passwordPattern = 'Pattern does not match';

	constructor(private route: Router, private dataService: DataService) {
	}

	ngOnInit() {
		// add necessary validators

		this.loginForm = new FormGroup({
			userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[a-zA-Z0-9_]*$")]),
			password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
		});
	}

	doLogin() {
		console.debug("login...");
		let username = this.loginForm.get("userName").value;
		let password = this.loginForm.get("password").value;
		// call authenticateUser method to perform login operation
		this.dataService.authenticateUser(username, password).subscribe(res => {
			console.log(res != null ? res : "null res");
			// if success, redirect to profile page
			if (res) {
				console.log("redirecting to /profile page")
				this.route.navigate(["/profile"])
			} else {
				// else display appropriate error message
				localStorage.clear()
				this.isLoginFailed = true;
			}
			// reset the form

		},
			(error) => {
				console.log(error);
				this.isLoginFailed = true;
			})

	}

	signUp() {
		// should navigate to register new user page
		this.route.navigate(["/signup"])
	}

	log() {
		console.log(this.loginForm)
	}

}



