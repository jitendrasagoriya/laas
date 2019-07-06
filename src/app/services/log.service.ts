import { Log } from './../models/log';
import { ExceptionService } from './exception.service';
import { ConfigurationService } from './configuration.service';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StringDecoder } from 'string_decoder';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'X-AUTH-LOG-HEADER': 'YAO7OV6S8I2D3HL7PXWB3GCAM7D95VIA1553246982106'
  })
};


@Injectable()
export class LogService {


  private handleError: HandleError;

  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private configurationService: ConfigurationService,
    private exceptionService: ExceptionService) {
      this.handleError = httpErrorHandler.createHandleError('LogService');
    }

  getCount(logType: String): Observable<any> {
    const apiUrl = this.configurationService.getBaseUrl() + `level/${logType}/count`;
    httpOptions.headers =
      httpOptions.headers.set('X-AUTH-LOG-HEADER', 'YAO7OV6S8I2D3HL7PXWB3GCAM7D95VIA1553246982106');

    return this.http.get<any >(apiUrl, httpOptions)
      .pipe(catchError(this.handleError('get count +' + logType))
    );
  }


  getYesterDayCount(past: String): Observable<any> {
    const apiUrl = this.configurationService.getBaseUrl() + `level/total/${past}`;
    httpOptions.headers =
    httpOptions.headers.set('X-AUTH-LOG-HEADER', 'YAO7OV6S8I2D3HL7PXWB3GCAM7D95VIA1553246982106');
    return this.http.get<any >(apiUrl, httpOptions)
      .pipe(catchError(this.handleError('get count +' + past))
    );
  }


  /** GET heroes from the server */
  getLogs (): Observable<Log[]> {
    const apiUrl = this.configurationService.getBaseUrl();

    httpOptions.headers =
    httpOptions.headers.set('X-AUTH-LOG-HEADER', 'YAO7OV6S8I2D3HL7PXWB3GCAM7D95VIA1553246982106');
    return this.http.get<Log[]>(apiUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }

  /* GET heroes whose name contains search term */
  searchLogs(term: string): Observable<Log[]> {
    term = term.trim();

    const apiUrl = this.configurationService.getBaseUrl();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set('name', term),
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-AUTH-LOG-HEADER': 'YAO7OV6S8I2D3HL7PXWB3GCAM7D95VIA1553246982106'
      }) } : {};

    return this.http.get<Log[]>(apiUrl, options)
      .pipe(
        catchError(this.handleError<Log[]>('searchHeroes', []))
      );
  }


}
