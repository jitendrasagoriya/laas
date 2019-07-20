import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

    canActivate() {
        console.log('currentuser ' + localStorage.getItem('currentUser') );
        if (localStorage.getItem('currentUser')) {
            console.log('currentuser ' + localStorage.getItem('currentUser') );
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['login']);
        return false;
    }

}
