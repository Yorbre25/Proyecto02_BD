import { Component, OnInit } from '@angular/core';
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';
import {Order} from 'src/app/Interfaces/Order'
//import {ProductService} from 'src/app/Services/product.service'

@Component({
  selector: 'app-member-orders',
  templateUrl: './member-orders.component.html',
  styleUrls: ['./member-orders.component.scss']
})
export class MemberOrdersComponent implements OnInit {
  tableColumns: KeyReplacement<Order>[]
  tableData: Order[]

  constructor() { 
    this.tableColumns = [
      { key: "id", replacement: "Código de Orden" },
      { key: "total", replacement: "Total" },
      { key: "shippingAddress", replacement: "Dirección de Envío" },
    ]
    this.tableData = []
  }

  ngOnInit(): void {
  }

}
