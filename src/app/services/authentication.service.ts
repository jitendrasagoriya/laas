import { catchError } from 'rxjs/operators';
import { Application } from './../models/application';
import { ExceptionService } from './exception.service';
import { ConfigurationService } from './configuration.service';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable()
export class AuthenticationService {

  private handleError: HandleError;

  public application: Application;

  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private configurationService: ConfigurationService,
    private exceptionService: ExceptionService) {
      this.handleError = httpErrorHandler.createHandleError('AuthenticationService');
    }


  /** POST: add a new application to the database */
  addApplication (application: Application): Observable<Application> {
    return this.http.post<Application>(this.configurationService.baseAuthenticationDevUrl, application, httpOptions)
      .pipe(
        catchError(this.handleError('addApplication', application))
      );
  }

  /** GET: get application to the database */
  getApplication (email: string, password: string): Observable<Application> {
    // tslint:disable-next-line:prefer-const
    const options = { params: new HttpParams().set('name', email.trim()).set('password', password.trim()) };
    return this.http.post<Application>(this.configurationService.baseAuthenticationDevUrl, httpOptions)
      .pipe(
        catchError(this.handleError('addApplication', this.application))
      );
  }

}
