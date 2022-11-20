import { Component, Input, OnChanges, OnInit } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'

import { Store } from 'src/app/Interfaces/Store'
import { StoreType } from 'src/app/Interfaces/StoreType'
import { MessageService } from 'src/app/Services/message.service'

import { StoreTypeService } from 'src/app/Services/store-type.service'

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent implements OnInit {
  id: FormControl
  name: FormControl
  email: FormControl
  province: FormControl
  city: FormControl
  district: FormControl
  storeTypeID: FormControl
  phoneNumbers: FormArray

  storeTypes: StoreType[]

  @Input() formGroup: FormGroup
  @Input() storeInfo?: Store

  constructor(
    private messageService: MessageService,
    private storeTypeService: StoreTypeService
  ) {
    this.formGroup = new FormGroup({})

    this.id = new FormControl('', [Validators.required])
    this.name = new FormControl('', [Validators.required])
    this.email = new FormControl('', [Validators.required])
    this.province = new FormControl('', [Validators.required])
    this.city = new FormControl('', [Validators.required])
    this.district = new FormControl('', [Validators.required])
    this.storeTypeID = new FormControl('', [Validators.required])
    this.phoneNumbers = new FormArray([new FormControl('')], [Validators.required])

    this.storeTypes = []
  }

  async ngOnInit(): Promise<void> {
    this.formGroup.addControl('id', this.id)
    this.formGroup.addControl('name', this.name)
    this.formGroup.addControl('email', this.email)
    this.formGroup.addControl('province', this.province)
    this.formGroup.addControl('city', this.city)
    this.formGroup.addControl('district', this.district)
    this.formGroup.addControl('storeTypeID', this.storeTypeID)
    this.formGroup.addControl('phoneNumbers', this.phoneNumbers)

    await this.getStoreTypes()
      .then((storeTypes) => { this.storeTypes = storeTypes })

    if (this.storeInfo && Object.keys(this.storeInfo).length) {
      this.phoneNumbers.removeAt(0)

      this.storeInfo.phoneNumbers.forEach(phoneNumber => {
        this.phoneNumbers.push(new FormControl(phoneNumber))
      })

      this.formGroup.patchValue(this.storeInfo)
    }
  }

  getStoreTypes = (): Promise<StoreType[]> => {
    return new Promise((resolve, reject) => {
      this.storeTypeService.getAllStoreTypes()
        .subscribe(response => {
          if (response.status == "error") {
            this.messageService.setMessageInfo(response.message!, "error")
          }
          else if (response.storeTypes) {
            resolve(response.storeTypes)
          }
          else {
            console.log(response)
          }
        })
    })
  }
}
