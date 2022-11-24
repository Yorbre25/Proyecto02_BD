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
  productsInCart: string[] = []



  constructor(private orderService: OrderService) {
    this.tableColumns = [
      { key: "productName", replacement: "Producto" },
      { key: "total", replacement: "Precio" },

    ]
    this.tableData = []
  }


  ngOnInit(): void {
    this.productsInCart = JSON.parse(String(Cookies.get('cartProductIds'))).productIDs 
    console.log(this.productsInCart)
  }

}


