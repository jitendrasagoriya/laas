import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ExceptionService {

  constructor(private router: Router) { }

  errorHandler(response: Response): void {
    const exception = response.json();
   }

   errorHandlerWithPage(response: Response, pageName: String): void {
     const exception = response.json();
    }

}
