import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/app/Services/login-service.service';
import { FormsService } from 'src/app/Services/forms.service';

@Component({
  selector: 'app-member-login',
  templateUrl: './member-login.component.html',
  styleUrls: ['./member-login.component.scss']
})
export class MemberLoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    protected formsService: FormsService
  ) { }

  ngOnInit(): void {
  }

  onSubmit = () => {
    this.formsService.printFormValue()
    window.location.href = '/member'
  }

}
