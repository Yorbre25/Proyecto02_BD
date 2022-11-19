import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'
import { DeliveryMan } from 'src/app/Interfaces/DeliveryMan'

import { AuxFunctionsService } from 'src/app/Services/aux-functions.service'
import { DeliveryManService } from 'src/app/Services/delivery-man.service'
import { MessageService } from 'src/app/Services/message.service'

@Component({
  selector: 'app-delivery-man-info',
  templateUrl: './delivery-man-info.component.html',
  styleUrls: ['./delivery-man-info.component.scss']
})
export class DeliveryManInfoComponent implements OnInit {
  deliveryManInfoTitles: KeyReplacement<DeliveryMan>[]
  deliveryMan: DeliveryMan
  deliveryManCopy: DeliveryMan

  constructor(
    private route: ActivatedRoute,
    private deliveryManService: DeliveryManService,
    protected auxFunctionsService: AuxFunctionsService,
    protected messageService: MessageService
  ) {
    this.deliveryManInfoTitles = [
      { key: "id", replacement: "Cédula" },
      { key: "username", replacement: "Nombre de usuario" },
      { key: "name", replacement: "Nombre completo" },
      { key: "email", replacement: "Correo electrónico" },
      { key: "province", replacement: "Dirección" },
      { key: "phoneNumbers", replacement: "Teléfonos" },
    ]

    this.deliveryMan = {} as DeliveryMan
    this.deliveryManCopy = {} as DeliveryMan
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.deliveryManService.getDeliveryMan(id)
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.deliveryMan) {
          this.deliveryMan = response.deliveryMan
          this.deliveryManCopy = { ...this.deliveryMan }

          this.deliveryMan.name =
            `${this.deliveryMan.name} ${this.deliveryMan.lastName1} ${this.deliveryMan.lastName2}`

          this.deliveryMan.province =
            `${this.deliveryMan.province}, ${this.deliveryMan.city}, ${this.deliveryMan.district}`
        }
        else {
          console.log(response)
        }
      })
  }

  deleteDeliveryMan = (): void => {
    this.deliveryManService.deleteDeliveryMan(this.deliveryMan.id)
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else {
          window.location.href = '/manager/delivery_men'
        }
      })
  }
}
