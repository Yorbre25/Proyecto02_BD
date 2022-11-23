import { Component, OnInit } from '@angular/core';
//import Cookies from 'js-cookie';

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';
import { Product } from 'src/app/Interfaces/Product'

import { StoreService } from 'src/app/Services/store.service';

@Component({
  selector: 'app-client-business',
  templateUrl: './client-business.component.html',
  styleUrls: ['./client-business.component.scss']
})
export class ClientBusinessComponent implements OnInit {
  tableColumns: KeyReplacement<Product>[]
  tableData: Product[]
  constructor(private storeServide: StoreService) {
    this.tableColumns = [
      { key: "name", replacement: "Nombre del Restaurante" },
    ]
    this.tableData = []
   }

  ngOnInit(): void {
    //const storeID = Number(Cookies.get('storeID'))
    //this.storeService.getAllStoreProducts(storeID)
    //  .subscribe(response => {
      //  if (response.status === 'error') {
      //    alert(response.message)
      //  }
    //    else if (response.products) {
    //      this.tableData = response.products
    //    }
    //    else {
   //       console.log(response)
  //      }
  //    })
  }

}
