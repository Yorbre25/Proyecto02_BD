import { Component, OnInit } from '@angular/core';
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';
import { Order } from 'src/app/Interfaces/Order'
//import {ProductService} from 'src/app/Services/product.service'

@Component({
  selector: 'app-client-recents',
  templateUrl: './client-recents.component.html',
  styleUrls: ['./client-recents.component.scss']
})
export class ClientRecentsComponent implements OnInit {
  tableColumns: KeyReplacement<Order>[]
  tableData: Order[]

  constructor() {
    this.tableColumns = [
      { key: "id", replacement: "Código de Orden" },
      { key: "total", replacement: "Total" },
      // { key: "shippingAddress", replacement: "Dirección de Envío" }, Cambio de interfaz
      // { key: "delivMan", replacement: "Repartidor" },
    ]
    this.tableData = []
  }

  ngOnInit(): void {
    // this.storeService.getAllStoresData()
    //   .subscribe(response => {
    //     if (response.status === 'error') {
    //       alert(response.message)
    //     }
    //     else if (response.storesData) {
    //       const stores: Store[] = response.storesData
    //         .map((storeData) => {
    //           let store: any = storeData.store
    //           const manager = storeData.manager

    //           store.managerID = `
    //             ${manager.name} ${manager.lastName1} ${manager.lastName2}`
    //           return store
    //         })

    //       this.tableData = stores
    //     }
    //     else {
    //       console.log(response)
    //     }
    //   })
  }

}
