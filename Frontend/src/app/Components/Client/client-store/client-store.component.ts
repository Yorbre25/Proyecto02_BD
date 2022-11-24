import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';

import { Store } from 'src/app/Interfaces/Store'
import { StoreService } from 'src/app/Services/store.service';
import { ServerResponse } from 'src/app/Interfaces/ServerResponses'

import { Order } from 'src/app/Interfaces/Order'
import { OrderService } from 'src/app/Services/order.service';

import { Product } from 'src/app/Interfaces/Product'
import { ProductService } from 'src/app/Services/product.service';


@Component({
  selector: 'app-client-store',
  templateUrl: './client-store.component.html',
  styleUrls: ['./client-store.component.scss']
})
export class ClientSTOREComponent implements OnInit {
  tableColumns: KeyReplacement<Product>[]
  tableData: Product[]
  storeName: string | undefined
  cartProductIds: string[]
  s = Number(Cookies.get('storeID'))
  constructor(
    private productService: ProductService,
    private storeService: StoreService,
    private orderService: OrderService) {
    this.storeName = 'nan'
    this.tableColumns = [
      { key: "barCode", replacement: "ID" },
      { key: "price", replacement: "Precio" },
      { key: "name", replacement: "Nombre" },
      { key: "categoryName", replacement: "CategorÃ­a" },
    ]
    this.tableData = []
    this.cartProductIds = []

  }
  ngOnInit(): void {
    const storeID = Number(Cookies.get('storeId'))
    this.productService.getAllStoreProducts(storeID)
      .subscribe(response => {
        if (response.status === 'error') {
          alert(response.message)
        }
        else if (response.products) {
          this.tableData = response.products
        }
        else {
          console.log(response)
        }
      })

    this.storeService.getStore(Number(Cookies.get('storeId')))
      .subscribe(response => {
        if (response.status === 'error') {
          alert(response.message)
        }
        else if (response.storeData) {
          this.storeName = response.storeData.store.name
        }
        else {
          console.log(response)
        }
      })
  }


  addToCart = (productID: any) => {

    this.cartProductIds.push(productID)

    let cpi =
    {
      'productIDs': this.cartProductIds
    }

    Cookies.set('cartProductIds', JSON.stringify(cpi))
    //window.location.href = 'client/stores/${storeID}'
  }


}