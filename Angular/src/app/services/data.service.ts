import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';

import { ApiService } from './api.service';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginResponse } from '../models/loginResponse';

@Injectable()
export class DataService {

  userId: string;

  isLoggedIn = false;
  isLogIn: BehaviorSubject<boolean>;
  loginResponse: any

  constructor(private api: ApiService) {
    this.isLogIn = new BehaviorSubject<boolean>(false);
  }

  authenticateUser(user_name: string, password: string): Observable<boolean> {

    this.api.checkLogin(user_name, password).subscribe((res) => {
      const loginResponse = <LoginResponse>res;

      // store 'id' from response as key name 'id' to the localstorage
      localStorage.setItem('id', loginResponse.id);

      // store 'token' from response as key name 'token' to the localstorage
      localStorage.setItem('token', loginResponse.token);
    
      // return true if user authenticated
      this.isLogIn.next(loginResponse.success);
      this.isLoggedIn = loginResponse.success
      this.userId = loginResponse.id;
    

    }, (error) => {
      console.error(error)
      this.isLogIn.next(false);
      this.isLoggedIn = false;
    })


    return this.isLogIn;
    

    // return false if user not authenticated 
  }

  getAuthStatus(): Observable<boolean> {
    // return true/false as a auth status
    return this.isLogIn;
  }

  regNewUser(regNewUser: Users): Observable<any> {
    // should return response retrieved from ApiService

    return this.api.regNewUser(regNewUser);

  }

  doLogOut() {
    // You should remove the key 'id', 'token' if exists
    localStorage.clear();
  }

  getUserDetails(): Observable<any> {
    // should return user details retrieved from api service
    return this.api.getUserDetails(this.userId).pipe(catchError(error=>throwError(error)));
  }

  updateProfile(userId: string, userDetails): Observable<boolean> {
    // should return response retrieved from ApiService

    let profileUpdated = new BehaviorSubject<boolean>(false);
    this.api.updateDetails(userId,userDetails).subscribe((res) => {
      const loginResponse = <LoginResponse>res;
      // store 'id' from response as key name 'id' to the localstorage
      localStorage.setItem('id', loginResponse.id);

      // store 'token' from response as key name 'token' to the localstorage
      localStorage.setItem('token', loginResponse.token);
    
      // return true if user authenticated
      profileUpdated.next(true);
    

    }, (error) => {
      console.error(error)
      profileUpdated.next(false);
    })


    return profileUpdated;

    
    // handle error 

  }

  registerPatient(patientDetails): Observable<any> {
    // should return response retrieved from ApiService
    return this.api.registerPatient(patientDetails);
    // handle error 

  }

  getAllPatientsList(): Observable<any> {
    // should return all patients from server
    return this.api.getAllPatientsList();
    // handle error 

  }

  getParticularPatient(id): Observable<any> {
    // should return particular patient details from server
    return this.api.getParticularPatient(id);
    // handle error 
  }

  diseasesList(): Observable<any> {
    // should return diseases from server
    return this.api.diseasesList();
    // handle error 

    
  }

  scheduleAppointment(appointmentDetails): Observable<any> {
    // should return response from server if appointment booked successfully
    return this.api.scheduleAppointment(appointmentDetails)
    // handle error 

  }

  getSinglePatientAppointments(patientId): Observable<any> {
    // should return appointments of particular patient from server
    return this.api.getSinglePatientAppointments(patientId);
    // handle error 

  }

  deleteAppointment(appointmentId): Observable<any> {
    // should delete the appointment

    // handle error

    return this.api.deleteAppointment(appointmentId);
  }

  requestedAppointments(): Observable<any> {
    // should return all requested appointments from server

    // handle error 

    return this.api.requestedAppointments();
  }

  private handleError(error: HttpErrorResponse) {
    // handle error here
    throwError(error);
  }


}

