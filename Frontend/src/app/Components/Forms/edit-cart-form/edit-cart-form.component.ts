import { Component, Input, OnInit } from '@angular/core';
import Cookies from 'js-cookie';

import { ProductService } from 'src/app/Services/product.service';
@Component({
  selector: 'app-edit-cart-form',
  templateUrl: './edit-cart-form.component.html',
  styleUrls: ['./edit-cart-form.component.scss']
})
export class EditCartFormComponent implements OnInit {
  productQuantityInCart: number[] = []
  productIDsInCart: string[] = []
  productNameInCart: string[] = []
  productPriceInCart: string[] = []

  @Input() productsInCart?: string[]

  constructor(
    private productService: ProductService
  ) {
    this.productsInCart = JSON.parse(String(Cookies.get('cartProductIds'))).productIDs

    console.log(this.productsInCart)

    for (var productID of this.productsInCart!) {
      if (this.productIDsInCart.indexOf(productID) == -1) {
        this.productIDsInCart.push(productID!)
        this.productQuantityInCart.push(1)
      } else {
        let i = this.productIDsInCart.indexOf(productID)
        this.productQuantityInCart[i] = this.productQuantityInCart[i] + 1
      }


    }

    console.log(this.productIDsInCart)
    console.log(this.productQuantityInCart)

  }

  ngOnInit(): void {
    for (var productID of this.productIDsInCart!) {
      this.productService.getProduct(Number(productID))
        .subscribe(response => {
          if (response.status === 'error') {
            alert(response.message)
          }
          else if (response.product) {
            console.log(response.product)
            this.productNameInCart.push(response.product.name)
            this.productPriceInCart.push(response.product.price)

          }
          else {
            console.log(response)
          }

        })
    }


  }
}