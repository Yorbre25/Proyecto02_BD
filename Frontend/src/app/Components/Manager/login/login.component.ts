import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/app/Services/login-service.service';
import { FormsService } from 'src/app/Services/forms.service';

@Component({
  selector: 'app-manager-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class ManagerLoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    protected formsService: FormsService
  ) { }

  ngOnInit(): void { }

  onSubmit = () => {
    this.formsService.printFormValue()
  }
}
