import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormArray, Validators } from '@angular/forms';

import { DeliveryMan } from 'src/app/Interfaces/DeliveryMan';
import { ServerResponse } from 'src/app/Interfaces/ServerResponses';

import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';

import { FormsService } from 'src/app/Services/forms.service';
import { DeliveryManService } from 'src/app/Services/delivery-man.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-add-delivery-man-form',
  templateUrl: './add-delivery-man-form.component.html',
  styleUrls: ['./add-delivery-man-form.component.scss']
})
export class AddDeliveryManFormComponent implements OnInit, OnChanges {
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

  @Input() deliveryManInfo?: DeliveryMan

  constructor(
    private messageService: MessageService,
    private auxFunctionsService: AuxFunctionsService,
    private deliveryManService: DeliveryManService,
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
  }

  ngOnChanges(): void {
    console.log(this.deliveryManInfo);

    if (this.deliveryManInfo && Object.keys(this.deliveryManInfo).length) {
      const { ...deliveryManInfo } = this.deliveryManInfo as any

      this.formsService.form.patchValue(deliveryManInfo)

      this.phoneNumbers.removeAt(0)

      this.deliveryManInfo.phoneNumbers.forEach(phoneNumber => {
        this.phoneNumbers.push(new FormControl(phoneNumber))
      })
    }
  }

  onSubmit = async () => {
    if (this.deliveryManInfo && Object.keys(this.deliveryManInfo).length) {
      await this.updateDeliveryMan()
        .then((response: ServerResponse) => {
          if (response.status === 'error') {
            this.messageService.setMessageInfo(response.message!, 'error')
          }
          else if (this.deliveryManInfo!.id !== this.formsService.form.value.id) {
            window.location.href =
              `/manager/delivery_men/${this.formsService.form.value.id}`
          }
          else {
            window.location.reload()
          }
        })
    }
    else {
      await this.createDeliveryMan()
        .then((response) => {
          this.auxFunctionsService.handleResponse(response)
        })
    }
  }

  createDeliveryMan = (): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      const newDeliveryManInfo = this.formsService.getFormValue()

      this.deliveryManService.createDeliveryMan(newDeliveryManInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }

  updateDeliveryMan = (): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      const newDeliveryManInfo = this.formsService.getFormValue()

      this.deliveryManService.updateDeliveryMan(this.deliveryManInfo!.id, newDeliveryManInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }
}