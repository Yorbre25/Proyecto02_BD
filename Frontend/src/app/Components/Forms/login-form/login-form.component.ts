import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { FormsService } from 'src/app/Services/forms.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  username: FormControl
  password: FormControl

  @Input() onSubmit: () => void

  constructor(
    protected formsService: FormsService
  ) {
    this.username = new FormControl('', [Validators.required])
    this.password = new FormControl('', [Validators.required])

    this.onSubmit = () => { }
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('username', this.username)
    this.formsService.form.addControl('password', this.password)
  }
}
