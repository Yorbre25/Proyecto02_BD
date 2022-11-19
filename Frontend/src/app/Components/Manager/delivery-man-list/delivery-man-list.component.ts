import { Component, OnInit } from '@angular/core'

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'
import { DeliveryMan } from 'src/app/Interfaces/DeliveryMan'

import { DeliveryManService } from 'src/app/Services/delivery-man.service'
import { MessageService } from 'src/app/Services/message.service'

@Component({
  selector: 'app-delivery-man-list',
  templateUrl: './delivery-man-list.component.html',
  styleUrls: ['./delivery-man-list.component.scss']
})
export class DeliveryManListComponent implements OnInit {
  tableColumns: KeyReplacement<DeliveryMan>[]
  tableData: DeliveryMan[]

  constructor(
    private deliveryManService: DeliveryManService,
    protected messageService: MessageService
  ) {
    this.tableColumns = [
      { key: "id", replacement: "Cédula" },
      { key: "username", replacement: "Nombre de usuario" },
      { key: "name", replacement: "Nombre completo" },
      { key: "email", replacement: "Correo electrónico" },
    ]

    this.tableData = []
  }

  ngOnInit(): void {
    this.messageService.resetMessageInfo()

    this.deliveryManService.getAllDeliveryMen()
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.deliveryMen) {
          this.tableData = response.deliveryMen
          this.tableData.forEach((deliveryMan) => {
            deliveryMan.name = `${deliveryMan.name} ${deliveryMan.lastName1} ${deliveryMan.lastName2}`
          })
        }
        else {
          console.log(response)
        }
      })
  }
}