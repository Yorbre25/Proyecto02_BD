import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';

import { Store } from 'src/app/Interfaces/Store'
import { StoreService } from 'src/app/Services/store.service';

import { Product } from 'src/app/Interfaces/Product'
import { ProductService } from 'src/app/Services/product.service';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-client-store',
  templateUrl: './client-store.component.html',
  styleUrls: ['./client-store.component.scss']
})
export class ClientSTOREComponent implements OnInit {
  tableColumns: KeyReplacement<Product>[]
  tableData: Product[]
  storeName: string | undefined
  constructor(private productService: ProductService, private storeService: StoreService) {
    this.storeName = 'nan'
    this.tableColumns = [

      { key: "price", replacement: "Precio" },
      { key: "name", replacement: "Nombre" },
      { key: "categoryName", replacement: "Categoría" },
    ]
    this.tableData = []
    
}
ngOnInit(): void {
  const storeID = Number(Cookies.get('storeID'))
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

      this.storeService.getStore(Number(Cookies.get('storeID')))
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

}
