import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';
import { Product } from 'src/app/Interfaces/Product';

import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-member-product-info',
  templateUrl: './member-product-info.component.html',
  styleUrls: ['./member-product-info.component.scss']
})
export class MemberProductInfoComponent implements OnInit {

  productInfoTitles: KeyReplacement<Product>[]
  product: Product
  productCopy: Product

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    protected auxFunctionsService: AuxFunctionsService
  ) {
    this.productInfoTitles = [
      { key: "barCode", replacement: "Código de barras" },
      { key: "name", replacement: "Nombre" },
      { key: "price", replacement: "Precio" },
      { key: "categoryName", replacement: "Categoría de producto" }
    ]

    this.product = {} as Product
    this.productCopy = {} as Product
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.productService.getProduct(id)
      .subscribe(response => {
        if (response.status === 'error') {
          alert(response.message)
        }
        else if (response.product) {
          this.product = response.product
          this.productCopy = structuredClone(this.product)
        }
        else {
          console.log(response)
        }
      })
  }

  deleteProduct = (): void => {
    this.productService.deleteProduct(this.product.barCode)
      .subscribe(response => {
        if (response.status === 'error') {
          alert(response.message)
        }
        else {
          window.location.href = '/member/product_management'
        }
      })
  }
}
