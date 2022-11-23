import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, Validators } from '@angular/forms';

import { Client } from 'src/app/Interfaces/Client';
import { ServerResponse } from 'src/app/Interfaces/ServerResponses';

import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';
import { FormsService } from 'src/app/Services/forms.service';
import { ClientService } from 'src/app/Services/client.service';

@Component({
  selector: 'app-add-client-form',
  templateUrl: './add-client-form.component.html',
  styleUrls: ['./add-client-form.component.scss']
})
export class AddClientFormComponent implements OnInit {
  id: FormControl
  username: FormControl
  name: FormControl
  lastName1: FormControl
  lastName2: FormControl
  email: FormControl
  province: FormControl
  city: FormControl
  district: FormControl
  phoneNumber: FormControl
  birthDay: FormControl
  password: FormControl
  passwordConfirm: FormControl
  oldPassword: FormControl

  
  constructor(
    private auxFunctionsService: AuxFunctionsService,
    private clientService: ClientService,
    private formsService: FormsService

  ) { 
    this.id = new FormControl('', [Validators.required])
    this.username = new FormControl('', [Validators.required])
    this.name = new FormControl('', [Validators.required])
    this.lastName1 = new FormControl('', [Validators.required])
    this.lastName2 = new FormControl('', [Validators.required])
    this.email = new FormControl('', [Validators.required])
    this.province = new FormControl('', [Validators.required])
    this.city = new FormControl('', [Validators.required])
    this.district = new FormControl('', [Validators.required])
    this.phoneNumber = new FormControl('', [Validators.required])
    this.password = new FormControl('', [Validators.required])
    this.birthDay = new FormControl('', [Validators.required])
    this.passwordConfirm = new FormControl('', [Validators.required])
    this.oldPassword = new FormControl('', [Validators.required])
  
  }

  ngOnInit(): void {
    this.formsService.resetForm()
    this.formsService.form.addControl('id', this.id)
    this.formsService.form.addControl('username', this.username)
    this.formsService.form.addControl('name', this.name)
    this.formsService.form.addControl('lastName1', this.lastName1)
    this.formsService.form.addControl('lastName2', this.lastName2)
    this.formsService.form.addControl('email', this.email)
    this.formsService.form.addControl('province', this.province)
    this.formsService.form.addControl('city', this.city)
    this.formsService.form.addControl('district', this.district)
    this.formsService.form.addControl('phoneNumber', this.phoneNumber)
    this.formsService.form.addControl('birthDay', this.birthDay)
    this.formsService.form.addControl('password', this.password)
    this.formsService.form.addControl('passwordConfirm', this.passwordConfirm)
    this.formsService.form.addControl('oldPassword', this.oldPassword)
 
  }

  onSubmit = async () => {
    const newClientInfo = this.formsService.getFormValue()

    if (newClientInfo.password !== newClientInfo.passwordConfirm) {
      alert('Las contraseñas no coinciden')
      return
    } else {
      delete newClientInfo.passwordConfirm
    }

    await this.createClient(newClientInfo)
      .then((response) => {
        this.auxFunctionsService.handleResponse(response)
      })
  }

  createClient = (newClientInfo: Client): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      this.clientService.createClient(newClientInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }
}
