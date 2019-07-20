import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Application } from './../../models/application';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../../_helper/must-match.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  public application:  Application = {} as Application;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService) { }

  ngOnInit() {

    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['admin/home']);
    }

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
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

      this.application.appName
        = this.registerForm.get('name').value;
      this.application.email
        = this.registerForm.get('email').value;
      this.application.password
        = this.registerForm.get('password').value;

      this.authentication.addApplication(this.application).subscribe((application) => {
        if (application.accessToken.trim().length !== 0 ) {
          this.application = application;
          this.registerForm.reset();

          // store username and jwt token in local storage to keep user logged in between page refreshes
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
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
  }

}
