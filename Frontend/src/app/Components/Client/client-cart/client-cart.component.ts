import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';
import { Order } from 'src/app/Interfaces/Order'

import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-client-cart',
  templateUrl: './client-cart.component.html',
  styleUrls: ['./client-cart.component.scss']
})
export class ClientCartComponent implements OnInit {
  tableColumns: KeyReplacement<Order>[]
  tableData: Order[]
  currentOrder: Order



  constructor(private orderService: OrderService) {
    this.tableColumns = [
      { key: "productName", replacement: "Producto" },
      { key: "total", replacement: "Precio" },

    ]
    this.tableData = []

    this.currentOrder = {} as Order
  }

  ngOnInit(): void {
    let idCli = Number(Cookies.get('idClient'))

    this.orderService.getAllOrdersCli()
      .subscribe(response => {
        if (response.status === 'error') {
          alert(response.message)
        }
        else if (response.orders) {
          console.log(response.orders)

          
          this.tableData = response.orders
            .filter(order => order.clientId === idCli)
          console.log(this.tableData);

          this.currentOrder = response.orders.find(order => order.status === 'EnProceso')!
        }
        else {
          console.log(response)
        }
      })

  }

}


