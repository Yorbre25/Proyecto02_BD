import Cookies from 'js-cookie'

import { Component, OnInit } from '@angular/core'

import { LoginService } from 'src/app/Services/login-service.service'
import { FormsService } from 'src/app/Services/forms.service'
import { LoginInfo } from 'src/app/Interfaces/Auxiliaries'
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.scss']
})
export class ClientLoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    protected formsService: FormsService
  ) { }

  ngOnInit(): void {
  }

  onSubmit = () => {
    const loginInfo: LoginInfo = this.formsService.getFormValue()
    console.log(loginInfo);

    // this.loginService.clientLogin(loginInfo)
    //   .then((response) => {
    //     if (response.status === 'error') {
    //       alert(response.message)
    //     }
    //     else {
    //       Cookies.set('username', loginInfo.username)
    //       Cookies.set('userType', 'manager')
    //       Cookies.set('idClient', response.id)
    //     }
    //   })
    window.location.href = '/client'
  }

}
