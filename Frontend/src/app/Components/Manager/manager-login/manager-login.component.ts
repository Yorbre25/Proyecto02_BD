import { CookieService } from 'ngx-cookie-service'
import { Component, OnInit } from '@angular/core'

import { LoginInfo } from 'src/app/Interfaces/Auxiliaries'

import { LoginService } from 'src/app/Services/login-service.service'
import { FormsService } from 'src/app/Services/forms.service'
import { MessageService } from 'src/app/Services/message.service'

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.scss']
})
export class ManagerLoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    private formsService: FormsService,
    protected messageService: MessageService
  ) { }

  ngOnInit(): void { }

  onSubmit = () => {
    const loginInfo: LoginInfo = this.formsService.getFormValue()
    this.loginService.adminLogin(loginInfo)
      .then((response) => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else {
          this.cookieService.set('username', loginInfo.username)
          this.cookieService.set('userType', 'manager')

          window.location.href = '/manager'
        }
      })
  }
}