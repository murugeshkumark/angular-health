import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';
import { catchError, tap } from 'rxjs/operators';
import { LoginResponse } from '../models/loginResponse';

@Injectable()
export class ApiService {

  API_URL: String;

  constructor(private http: HttpClient) {

    this.API_URL = 'http://localhost:8080';

  }

  public checkLogin(user_name: string, password: string): Observable<any> {
    // should return response from server
    try {
      let user = {
      "user_name" : user_name,
      "password" : password
      }
      return this.http.post<LoginResponse>(this.API_URL + "/signin", user);
    } catch (err) {
      console.log(err)
    }

  }

  public regNewUser(regNewUser): Observable<any> {
    // should return response from server
   return this.http.post<LoginResponse>(this.API_URL + "/register", regNewUser);

  
  }

  public getUserDetails(userId: string): Observable<any> {
    // should return user details retireved from server
    return this.http.get<Users>(this.API_URL+"/viewprofile/"+userId);
    // handle error 
  }

  public updateDetails(userId: string, userDetails: any): Observable<any> {
    // should return response from server
    return this.http.put<Users>(this.API_URL+"/editprofile/"+userId, userDetails);
    // handle error 

  }

  public registerPatient(patient: any): Observable<any> {
    // should return response from server if patientDetails added successfully
    return this.http.post<Users>(this.API_URL+"/patients/register", patient);
    // handle error 
  }

  public getAllPatientsList(): Observable<any> {
    // should return all patients from server
    return this.http.get(this.API_URL+"/patients/list/");
    // handle error 

  }

  public getParticularPatient(patientId): Observable<any> {
    // should return particular patient details from server
    return this.http.get(this.API_URL+"/patients/view/"+patientId);
    // handle error 

  }

  public diseasesList(): Observable<any> {
    // should return diseases from server
    return this.http.get(this.API_URL+"/diseases");
    // handle error 

  }

  public scheduleAppointment(appointmentDetails: any): Observable<any> {
    // should return response from server if appointment booked successfully
    return this.http.post(this.API_URL+"/appointment/register",appointmentDetails);
    // handle error 

  }

  public getSinglePatientAppointments(patientId): Observable<any> {
    // should return appointments of particular patient from server
    return this.http.get(this.API_URL+"/appointment/list/"+patientId);
    // handle error 

  }

  public deleteAppointment(appointmentId): Observable<any> {
    // should delete the appointment
    return this.http.delete(this.API_URL+"/appointment/delete/"+appointmentId);
    // handle error

  }

  public requestedAppointments(): Observable<any> {
    // should return all requested appointments from server
    return this.http.get(this.API_URL+"/appointment/list");
    // handle error 

  }


  private handleError(error: HttpErrorResponse) {
    throwError(error)
  }

}
