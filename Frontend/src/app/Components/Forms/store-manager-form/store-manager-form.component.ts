import { Component, Input, OnChanges, OnInit } from '@angular/core'
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms'

import { StoreManager } from 'src/app/Interfaces/Store'
import { AuxFunctionsService } from 'src/app/Services/aux-functions.service'
import { MessageService } from 'src/app/Services/message.service'

@Component({
  selector: 'app-store-manager-form',
  templateUrl: './store-manager-form.component.html',
  styleUrls: ['./store-manager-form.component.scss']
})
export class StoreManagerFormComponent implements OnInit {
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

  @Input() formGroup: FormGroup
  @Input() managerInfo?: StoreManager

  constructor(
    private messageService: MessageService,
    private auxFunctionsService: AuxFunctionsService,
  ) {
    this.formGroup = new FormGroup({})

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
  }

  ngOnInit(): void {
    this.formGroup.addControl('id', this.id)
    this.formGroup.addControl('username', this.username)
    this.formGroup.addControl('name', this.name)
    this.formGroup.addControl('lastName1', this.lastName1)
    this.formGroup.addControl('lastName2', this.lastName2)
    this.formGroup.addControl('email', this.email)
    this.formGroup.addControl('province', this.province)
    this.formGroup.addControl('city', this.city)
    this.formGroup.addControl('district', this.district)
    this.formGroup.addControl('phoneNumbers', this.phoneNumbers)

    if (this.managerInfo && Object.keys(this.managerInfo).length) {
      this.formGroup.patchValue(this.managerInfo)

      this.phoneNumbers.removeAt(0)

      this.managerInfo.phoneNumbers.forEach(phoneNumber => {
        this.phoneNumbers.push(new FormControl(phoneNumber))
      })

      this.formGroup.patchValue(this.managerInfo)
    }
  }
}
