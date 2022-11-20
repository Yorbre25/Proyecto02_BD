import { Component, OnInit } from '@angular/core'

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'
import { DeliveryMan } from 'src/app/Interfaces/DeliveryMan'

import { DeliveryManService } from 'src/app/Services/delivery-man.service'

@Component({
  selector: 'app-delivery-man-list',
  templateUrl: './delivery-man-list.component.html',
  styleUrls: ['./delivery-man-list.component.scss']
})
export class DeliveryManListComponent implements OnInit {
  tableColumns: KeyReplacement<DeliveryMan>[]
  tableData: DeliveryMan[]

  constructor(
    private deliveryManService: DeliveryManService
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
    this.deliveryManService.getAllDeliveryMen()
      .subscribe(response => {
        if (response.status === 'error') {
          alert(response.message)
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