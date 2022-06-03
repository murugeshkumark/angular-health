import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';

import { Users } from '../../models/users';
import { DataService } from '../../services/data.service';
// import * as alertify from 'alertify.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  // used as a flag to display or hide form
  editProfile = false;
  userDetails;
  updateMyDetails: any = {};
  editProfileForm: FormGroup;
  userImg = './../../assets/user.jpg';
  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';
  constructor(private dataService: DataService) {

  }

  ngOnInit() {

    // add necessary validators
    // username should be disabled. it should not be edited

    this.editProfile = false;

    try {
      this.getProfileDetails()
    } catch (error) {
      throwError(error)
    }

    this.editProfileForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[a-zA-Z0-9_]*$")]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]{10}$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      location: new FormControl('', Validators.required)
    });

    // get profile details and display it

  }

  getProfileDetails() {

    // retrieve user details from service using userId
    this.dataService.getUserDetails().subscribe(res => {
      this.userDetails = <Users>res;
      this.discardEdit();
      this.resetForm();
    }, (error) => {
      this.discardEdit();
      this.resetForm();
      throwError(error);
    });

  }
  resetForm() {
    this.editProfileForm?.controls['userName'].setValue('');
    this.editProfileForm?.controls['mobile'].setValue('');
    this.editProfileForm?.controls['email'].setValue('');
    this.editProfileForm?.controls['location'].setValue('');
  }

  changeMyProfile() {

    // if successfully changed the profile it should display new details hiding the form

    this.updateMyDetails.user_email = this.editProfileForm.get("email").value
    this.updateMyDetails.user_mobile = this.editProfileForm.get("mobile").value
    this.updateMyDetails.location = this.editProfileForm.get("location").value
    this.dataService.updateProfile(localStorage.getItem("id"), this.updateMyDetails).subscribe(res => {
      if (res) {
        this.getProfileDetails();
        this.discardEdit();
        this.editProfile = false;
      }

    }, (error) => {

    });
    console.log("done")



  }

  editMyProfile() {

    // change editProfile property value appropriately
    this.editProfile = true;
    this.editProfileForm.controls['userName'].setValue(this.userDetails.user_name);
    this.editProfileForm.controls['mobile'].setValue(this.userDetails.user_mobile);
    this.editProfileForm.controls['email'].setValue(this.userDetails.user_email);
    this.editProfileForm.controls['location'].setValue(this.userDetails.location);
    // this.userDetails = null;

  }

  discardEdit() {

    // change editProfile property value appropriately
    this.editProfile = false;

  }

}
