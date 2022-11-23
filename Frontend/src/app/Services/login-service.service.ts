import Cookies from 'js-cookie'

import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { apiURL } from '../app.component'

import { LoginInfo } from '../Interfaces/Auxiliaries'
import { ServerResponse } from '../Interfaces/ServerResponses'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = `${apiURL}/login`

  constructor(
    private httpClient: HttpClient
  ) { }

  adminLogin = (loginInfo: LoginInfo): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      this.httpClient.post<ServerResponse>(`${this.url}/admin`, loginInfo)
        .subscribe((response) => resolve(response))
    })
  }

  managerLogin = (loginInfo: LoginInfo): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      this.httpClient.post<ServerResponse>(`${this.url}/manager`, loginInfo)
        .subscribe((response) => resolve(response))
    })
  }

  clientLogin = (loginInfo: LoginInfo): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      this.httpClient.post<ServerResponse>(`${this.url}/client`, loginInfo)
        .subscribe((response) => resolve(response))
    })
  }

  logout = () => {
    Cookies.remove('username')
    Cookies.remove('userType')
    Cookies.remove('storeID')

    window.location.href = '/'
  }
}