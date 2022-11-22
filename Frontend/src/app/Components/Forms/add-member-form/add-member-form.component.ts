import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';

import { Manager } from 'src/app/Interfaces/Manager';
import { ServerResponse } from 'src/app/Interfaces/ServerResponses';

import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';
import { FormsService } from 'src/app/Services/forms.service';
import { ManagerService } from 'src/app/Services/manager.service'; // cambiar esto
import { MessageService } from 'src/app/Services/message.service'; // cambiar esto

@Component({
  selector: 'app-add-member-form',
  templateUrl: './add-member-form.component.html',
  styleUrls: ['./add-member-form.component.scss']
})
export class AddMemberFormComponent implements OnInit {
  id: FormControl
  username: FormControl
  name: FormControl
  type: FormControl
  province: FormControl
  city: FormControl
  district: FormControl
  phoneNumber: FormControl
  email: FormControl
  administrator: FormControl
  password: FormControl
  passwordConfirm: FormControl

  constructor(
    private messageService: MessageService,
    private auxFunctionsService: AuxFunctionsService,
    private managerService: ManagerService,
    protected formsService: FormsService
  ) { // esto no es asi
    this.id = new FormControl('', [Validators.required])
    this.username = new FormControl('', [Validators.required])
    this.name = new FormControl('', [Validators.required])
    this.type = new FormControl('', [Validators.required])
    this.province = new FormControl('', [Validators.required])
    this.city = new FormControl('', [Validators.required])
    this.district = new FormControl('', [Validators.required])
    this.phoneNumber = new FormControl('', [Validators.required])
    this.email = new FormControl('', [Validators.required])
    this.administrator = new FormControl('', [Validators.required])
    this.password = new FormControl('', [Validators.required])
    this.passwordConfirm = new FormControl('', [Validators.required])
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('id', this.id)
    this.formsService.form.addControl('username', this.username)
    this.formsService.form.addControl('name', this.name)
    this.formsService.form.addControl('lastName1', this.type)
    this.formsService.form.addControl('province', this.province)
    this.formsService.form.addControl('city', this.city)
    this.formsService.form.addControl('district', this.district)
    this.formsService.form.addControl('phoneNumber', this.phoneNumber)
    this.formsService.form.addControl('phoneNumber', this.phoneNumber)
    this.formsService.form.addControl('password', this.password)
    this.formsService.form.addControl('password', this.password)
    this.formsService.form.addControl('passwordConfirm', this.passwordConfirm)
  }

  onSubmit = async () => {
    const newManagerInfo = this.formsService.getFormValue()

    if (newManagerInfo.password !== newManagerInfo.passwordConfirm) {
      this.messageService.setMessageInfo('Las contraseñas no coinciden', 'error')
      return
    } else {
      this.messageService.resetMessageInfo()
      delete newManagerInfo.passwordConfirm
    }

    await this.createManager(newManagerInfo)
      .then((response) => {
        this.auxFunctionsService.handleResponse(response)
      })
  }

  createManager = (newManagerInfo: Manager): Promise<ServerResponse> => {

    return new Promise((resolve, reject) => {
      this.managerService.createManager(newManagerInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }
}
