import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormArray, Validators } from '@angular/forms'

import { ServerResponse } from 'src/app/Interfaces/ServerResponses'
import { StoreManager } from 'src/app/Interfaces/Store'

import { FormsService } from 'src/app/Services/forms.service'
import { StoreService } from 'src/app/Services/store.service'

@Component({
  selector: 'app-edit-store-manager-form',
  templateUrl: './edit-store-manager-form.component.html',
  styleUrls: ['./edit-store-manager-form.component.scss']
})
export class EditStoreManagerFormComponent implements OnInit {
  id: FormControl
  username: FormControl
  name: FormControl
  lastName1: FormControl
  lastName2: FormControl
  email: FormControl
  province: FormControl
  city: FormControl
  district: FormControl
  phoneNumbers: FormArray
  password: FormControl
  passwordConfirm: FormControl
  oldPassword: FormControl

  @Input() managerInfo?: StoreManager

  constructor(
    private storeService: StoreService,
    protected formsService: FormsService
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
    this.phoneNumbers = new FormArray([new FormControl('')], [Validators.required])
    this.password = new FormControl('', [Validators.required])
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
    this.formsService.form.addControl('phoneNumbers', this.phoneNumbers)
    this.formsService.form.addControl('password', this.password)
    this.formsService.form.addControl('passwordConfirm', this.passwordConfirm)
    this.formsService.form.addControl('oldPassword', this.oldPassword)
  }

  ngOnChanges(): void {

    if (this.managerInfo && Object.keys(this.managerInfo).length) {
      const { ...managerInfo } = this.managerInfo

      this.phoneNumbers.removeAt(0)

      managerInfo.phoneNumbers.forEach(phoneNumber => {
        this.phoneNumbers.push(new FormControl(phoneNumber))
      })

      this.formsService.patchFormValue(managerInfo)
    }
  }

  onSubmit = async () => {
    const newManagerInfo = this.formsService.getFormValue()
    const password = newManagerInfo.password
    const passwordConfirm = newManagerInfo.passwordConfirm

    const emptyPasswords =
      (password === null || password === '') &&
      (passwordConfirm === null || passwordConfirm === '')

    if (!emptyPasswords && password !== passwordConfirm) {
      alert('Las contraseñas no coinciden')
      return
    }
    else {
      delete newManagerInfo.passwordConfirm
    }

    await this.updateManager(newManagerInfo)
      .then((response) => {
        if (response.status === 'error') {
          alert(response.message)
        }
        else {
          window.location.reload()
        }
      })
  }

  updateManager = (newManagerInfo: StoreManager): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      if (this.managerInfo && Object.keys(this.managerInfo).length) {
        this.storeService.editStoreManager(this.managerInfo.id, newManagerInfo)
          .subscribe((response: ServerResponse) => resolve(response))
      }
    })
  }
}
