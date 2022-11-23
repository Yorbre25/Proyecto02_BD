import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';
import { Order } from 'src/app/Interfaces/Order'
import { OrderService } from 'src/app/Services/order.service'

@Component({
  selector: 'app-client-recents',
  templateUrl: './client-recents.component.html',
  styleUrls: ['./client-recents.component.scss']
})
export class ClientRecentsComponent implements OnInit {
  tableColumns: KeyReplacement<Order>[]
  tableData: Order[]

  constructor(private orderService: OrderService) {
    this.tableColumns = [
      { key: "id", replacement: "Código de Orden" },
      { key: "total", replacement: "Total" },

    ]
    this.tableData = []
  }

  ngOnInit(): void {

    let idCli = Cookies.get('idCli');
    this.orderService.getAllOrdersCli(Cookies.get('idClient'))
      .subscribe(response => {
        if (response.status === 'error') {
          alert(response.message)
        }
        else if (response.orders) {

          this.tableData = response.orders
        }
        else {
          console.log(response)
        }
      })
  }

}