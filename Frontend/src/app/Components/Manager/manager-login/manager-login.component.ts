//import Cookies from 'js-cookie'

import { Component, OnInit } from '@angular/core'

import { LoginInfo } from 'src/app/Interfaces/Auxiliaries'

import { LoginService } from 'src/app/Services/login-service.service'
import { FormsService } from 'src/app/Services/forms.service'

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.scss']
})
export class ManagerLoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private formsService: FormsService
  ) { }

  ngOnInit(): void { }

  onSubmit = () => {
    const loginInfo: LoginInfo = this.formsService.getFormValue()
    this.loginService.adminLogin(loginInfo)
      .then((response) => {
        if (response.status === 'error') {
          alert(response.message)
        }
        else {
          //Cookies.set('username', loginInfo.username)
         // Cookies.set('userType', 'manager')

          window.location.href = '/manager'
        }
      })
  }
}