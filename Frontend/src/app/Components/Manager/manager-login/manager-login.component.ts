import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/app/Services/login-service.service';
import { FormsService } from 'src/app/Services/forms.service';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.scss']
})
export class ManagerLoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    protected formsService: FormsService
  ) { }

  ngOnInit(): void { }

  onSubmit = () => {
    this.formsService.printFormValue()
    window.location.href = '/manager'
  }
}
