import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiURL } from '../app.component';

import { LoginInfo } from '../Interfaces/Auxiliaries';
import { ServerResponse } from '../Interfaces/ServerResponses';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = `${apiURL}/login`

  constructor(
    private httpClient: HttpClient,
    private cookieServie: CookieService
  ) { }

  adminLogin = (loginInfo: LoginInfo): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      this.httpClient.post<ServerResponse>(`${this.url}/admin`, loginInfo)
        .subscribe((response) => resolve(response))
    })
  }

  logout = () => {
    this.cookieServie.deleteAll('/')
    window.location.href = '/'
  }
}