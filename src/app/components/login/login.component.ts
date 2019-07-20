import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService) {
      if (localStorage.getItem('currentUser')) {
          this.router.navigate(['admin/home']);
      }
    }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['jitendrasagoriya@yahoo.co.in', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]]
   });
  }

   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }

   onSubmit() {
       this.submitted = true;
       // stop here if form is invalid
       if (this.registerForm.invalid) {
           return;
       }

      const email
        = this.registerForm.get('email').value;
      const password
        = this.registerForm.get('password').value;

       this.authentication.getApplication(email, password).subscribe((application) => {
         // store username and jwt token in local storage to keep user logged in between page refreshes
         console.log(application);
         if (application.exception && application.exception.code && application.exception.code !== 200) {
              console.log('error');
          } else {
            localStorage.setItem('currentUser', JSON.stringify(
              {
                appname: application.appName,
                token: application.accessToken,
                application:  JSON.stringify(application),
                description: application.description,
                onBoardTime: application.onBoardTime,
                email: application.email,
                access: application.access
              }
            ));
            this.router.navigate(['admin/home']);
          }
       });
   }

}
