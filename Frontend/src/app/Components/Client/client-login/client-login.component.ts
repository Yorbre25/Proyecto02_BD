import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/app/Services/login-service.service';
import { FormsService } from 'src/app/Services/forms.service';

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
    this.formsService.printFormValue()
    window.location.href = '/client'
  }

}
