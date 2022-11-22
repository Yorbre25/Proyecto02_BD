import { CookieService } from 'ngx-cookie-service'
import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/app/Services/login-service.service';
import { FormsService } from 'src/app/Services/forms.service';

import { LoginInfo } from 'src/app/Interfaces/Auxiliaries';

@Component({
  selector: 'app-member-login',
  templateUrl: './member-login.component.html',
  styleUrls: ['./member-login.component.scss']
})
export class MemberLoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    private formsService: FormsService
  ) { }

  ngOnInit(): void { }

  onSubmit = () => {
    const loginInfo: LoginInfo = this.formsService.getFormValue()
    this.loginService.managerLogin(loginInfo)
      .then((response) => {
        if (response.status === 'error') {
          alert(response.message)
        }
        else {
          this.cookieService.set('username', loginInfo.username)
          this.cookieService.set('userType', 'member')

          window.location.href = '/member'
        }
      })
  }

}
