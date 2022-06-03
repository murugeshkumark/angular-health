
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { DataService } from './data.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public dataService: DataService, public router: Router) { }

  canActivate(): boolean {
    // return true if authenticated else redirect to login page

    if(!this.dataService.isLoggedIn){
      console.debug("user not logged in, redirecting to login page")
      this.router.navigate(["/login"])
    }

    return true;
  }

}

