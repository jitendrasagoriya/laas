import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {

  public baseProdUrl = 'http://localhost:8084/api/db/ui/log/';
  public baseDevUrl = 'http://localhost:8084/api/db/ui/log/';

  public baseAuthenticationProdUrl = 'http://localhost:8084/api/authentication/';
  public baseAuthenticationDevUrl = 'http://localhost:8084/api/authentication/';

  public isProd = false;
  constructor() { }

  public getBaseUrl(): string {
    if ( this.isProd ) {
      return this.baseProdUrl;
    } else {
      return this.baseDevUrl;
    }
  }

  public getUtilityUrl(): string {
    return this.getBaseUrl() + 'utility/';
  }

}
