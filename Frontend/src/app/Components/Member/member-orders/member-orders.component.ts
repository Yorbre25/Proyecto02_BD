import Cookies from 'js-cookie';
import { Component, OnInit } from '@angular/core';

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';
import { Order } from 'src/app/Interfaces/Order'
import { OrderService } from 'src/app/Services/order.service';


@Component({
  selector: 'app-member-orders',
  templateUrl: './member-orders.component.html',
  styleUrls: ['./member-orders.component.scss']
})
export class MemberOrdersComponent implements OnInit {
  tableColumns: KeyReplacement<Order>[]
  // tableData: Order[]

  preparingTableData: Order[]
  onTheWayTableData: Order[]
  deliveredTableData: Order[]

  constructor(
    private orderService: OrderService
  ) {
    this.tableColumns = [
      { key: "id", replacement: "Código de Orden" },
      { key: "total", replacement: "Total" },
      { key: "shippingAddress", replacement: "Dirección de Envío" },
      { key: "delivMan", replacement: "Repartidor" },
    ]

    this.preparingTableData = []
    this.onTheWayTableData = []
    this.deliveredTableData = []
  }

  ngOnInit(): void {
    this.orderService.getAllOrders()
      .subscribe(response => {
        if (response.status === 'error') {
          alert(response.message)
        }
        else if (response.orders) {
          const storeID = Cookies.get('storeID')
          // const storeOrders = response.orders.filter(order => order.storeId === Number(storeID))

          console.log(response.orders);

        }
        else {
          console.log(response)
        }
      })
  }

}