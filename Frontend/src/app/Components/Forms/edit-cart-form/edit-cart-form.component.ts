import { Component, Input, OnInit } from '@angular/core';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-edit-cart-form',
  templateUrl: './edit-cart-form.component.html',
  styleUrls: ['./edit-cart-form.component.scss']
})
export class EditCartFormComponent implements OnInit {
  productQuantityInCart: number[] = []
  productNamesInCart: string[] = []

  @Input() productsInCart?: string[]

  constructor(
    
  ) { 
    this.productsInCart = JSON.parse(String(Cookies.get('cartProductIds'))).productIDs

    console.log(this.productsInCart)

    for (var productID of this.productsInCart!){
      if (this.productNamesInCart.indexOf(productID) == -1){
        this.productNamesInCart.push(productID!)
        this.productQuantityInCart.push(1)
      } else {
        let i = this.productNamesInCart.indexOf(productID)
        this.productQuantityInCart[i] = this.productQuantityInCart[i] + 1
      }
    }

    console.log(this.productNamesInCart)
    console.log(this.productQuantityInCart)


  }

  ngOnInit(): void {
  }


}