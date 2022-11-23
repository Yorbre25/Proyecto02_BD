import { Component, OnInit } from '@angular/core';
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';
import {Order} from 'src/app/Interfaces/Order'
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
      { key: "shippingAddress", replacement: "Dirección de Envío" },
      { key: "delivMan", replacement: "Repartidor" },
    ]
    this.tableData = []
  }

  ngOnInit(): void {
  }

}
