import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormArray, Validators } from '@angular/forms';

import { Order } from 'src/app/Interfaces/Order'
import { ServerResponse } from 'src/app/Interfaces/ServerResponses';

import { FormsService } from 'src/app/Services/forms.service';
import { OrderService } from 'src/app/Services/order.service'



@Component({
  selector: 'app-edit-cart-form',
  templateUrl: './edit-cart-form.component.html',
  styleUrls: ['./edit-cart-form.component.scss']
})
export class EditCartFormComponent implements OnInit {
  id: FormControl
  total: FormControl
  province: FormControl
  city: FormControl
  district: FormControl
  clientId: FormControl
  delManId: FormControl
  storeId: FormControl
  status: FormControl
  clientName: FormControl
  delManName: FormControl
  clientLastName: FormControl
  delManLastName: FormControl
  quantity: FormArray
  productBarCode: FormArray
  productName: FormArray

  @Input() orderInfo?: Order

  constructor(
    private orderService: OrderService,
    protected formsService: FormsService
  ) { 
    this.id = new FormControl('', [Validators.required])
    this.total = new FormControl('', [Validators.required])
    this.province = new FormControl('', [Validators.required])
    this.city = new FormControl('', [Validators.required])
    this.district = new FormControl('', [Validators.required])
    this.clientId = new FormControl('', [Validators.required])
    this.delManId = new FormControl('', [Validators.required])
    this.storeId = new FormControl('', [Validators.required])
    this.status = new FormControl('', [Validators.required])
    this.clientName = new FormControl('', [Validators.required])
    this.delManName = new FormControl('', [Validators.required])
    this.clientLastName = new FormControl('', [Validators.required])
    this.delManLastName = new FormControl('', [Validators.required])
    this.quantity = new FormArray([new FormControl('')], [Validators.required])
    this.productBarCode = new FormArray([new FormControl('')], [Validators.required])
    this.productName = new FormArray([new FormControl('')], [Validators.required])
  }

  ngOnInit(): void {
    this.formsService.form.addControl('id', this.id)
    this.formsService.form.addControl('total', this.total)
    this.formsService.form.addControl('province', this.province)
    this.formsService.form.addControl('city', this.city)
    this.formsService.form.addControl('district', this.district)
    this.formsService.form.addControl('clientId', this.clientId)
    this.formsService.form.addControl('delManId', this.delManId)
    this.formsService.form.addControl('storeId', this.storeId)
    this.formsService.form.addControl('clientName', this.clientName)
    this.formsService.form.addControl('delManName', this.delManName)
    this.formsService.form.addControl('clientLastName', this.clientLastName)
    this.formsService.form.addControl('delManLastName', this.delManLastName)
    this.formsService.form.addControl('quantity', this.quantity)
    this.formsService.form.addControl('productBarCode', this.productBarCode)
    this.formsService.form.addControl('productName', this.productName)
  }

  ngOnChanges(): void {
    if (this.orderInfo && Object.keys(this.orderInfo).length) {
      const { ...orderInfo } = this.orderInfo

      this.quantity.removeAt(0)

      orderInfo.quantity.forEach(quantity => {
        this.quantity.push(new FormControl(quantity))
      })

      this.productBarCode.removeAt(0)

      orderInfo.productBarCode.forEach(productBarCode => {
        this.productBarCode.push(new FormControl(productBarCode))
      })

      this.productName.removeAt(0)

      orderInfo.productName.forEach(productName => {
        this.productName.push(new FormControl(productName))
      })

      this.formsService.patchFormValue(orderInfo)
    }
  }

  onSubmit = async () => {
    const newOrderInfo = this.formsService.getFormValue()
    const password = newOrderInfo.password
    const passwordConfirm = newOrderInfo.passwordConfirm

    const emptyPasswords =
      (password === null || password === '') &&
      (passwordConfirm === null || passwordConfirm === '')

    if (!emptyPasswords && password !== passwordConfirm) {
      alert('Las contraseñas no coinciden')
      return
    }
    else {
      delete newOrderInfo.passwordConfirm
    }

    await this.updateOrder(newOrderInfo)
      .then((response) => {
        if (response.status === 'error') {
          alert(response.message)
        }
        else if (newOrderInfo.id !== this.orderInfo?.id) {
          window.location.href = `/order/employees/${newOrderInfo.id}`
        }
        else {
          window.location.reload();
        }
      })
  }

  updateOrder = (newOrderInfo: Order): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      if (this.orderInfo && Object.keys(this.orderInfo).length) {
        this.orderService.updateOrder(this.orderInfo.id, newOrderInfo)
          .subscribe((response: ServerResponse) => resolve(response))
      }
    })
  }

}