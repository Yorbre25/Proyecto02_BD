import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';
import { Product } from 'src/app/Interfaces/Product'

import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-member-product-management',
  templateUrl: './member-product-management.component.html',
  styleUrls: ['./member-product-management.component.scss']
})
export class MemberProductManagementComponent implements OnInit {
  tableColumns: KeyReplacement<Product>[]
  tableData: Product[]

  constructor(private productService: ProductService) {
    this.tableColumns = [
      { key: "barCode", replacement: "Código de Producto" },
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
  }
}



