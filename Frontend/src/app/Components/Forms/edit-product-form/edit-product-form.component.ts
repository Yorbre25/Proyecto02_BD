//import Cookies from 'js-cookie'

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

import { Product } from 'src/app/Interfaces/Product'
import { ProductCategory } from 'src/app/Interfaces/ProductCategory'
import { ServerResponse } from 'src/app/Interfaces/ServerResponses'

import { AuxFunctionsService } from 'src/app/Services/aux-functions.service'
import { FormsService } from 'src/app/Services/forms.service'
import { ProductCategoryService } from 'src/app/Services/product-category.service'
import { ProductService } from 'src/app/Services/product.service'

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss']
})
export class EditProductFormComponent implements OnInit, OnChanges {
  barCode: FormControl
  price: FormControl
  name: FormControl
  categoryId: FormControl
  photo: FormControl
  storeId: FormControl

  productCategories: ProductCategory[]

  photoSrc = '/assets/productPH.png'

  @Input() productInfo?: Product

  handleUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader()
      reader.onload = (event: any) => {
        this.photoSrc = event.target.result
      }
      reader.readAsDataURL(event.target.files[0])

      const filename = `${Math.random().toString(36).slice(2, 7)}`
      const blob = new Blob([event.target.files[0]])
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = window.URL.createObjectURL(blob)
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      this.photo.setValue(`/assets/product/${filename}`)
    }
  }

  constructor(
    protected formsService: FormsService,
    private auxFunctionsService: AuxFunctionsService,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService
  ) {
    this.barCode = new FormControl('', [Validators.required])
    this.price = new FormControl('', [Validators.required])
    this.name = new FormControl('', [Validators.required])
    this.categoryId = new FormControl('', [Validators.required])
    this.storeId = new FormControl('', [Validators.required])
    this.photo = new FormControl(this.photoSrc, [Validators.required])

    this.productCategories = []
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('barCode', this.barCode)
    this.formsService.form.addControl('price', this.price)
    this.formsService.form.addControl('name', this.name)
    this.formsService.form.addControl('categoryId', this.categoryId)
    this.formsService.form.addControl('photo', this.photo)
    this.formsService.form.addControl('storeId', this.storeId)

    this.getProductCategories()
      .then((productCategories) => { this.productCategories = productCategories })
  }

  ngOnChanges(): void {
    if (this.productInfo && Object.keys(this.productInfo).length) {
      const { ...productInfo } = this.productInfo
      this.formsService.patchFormValue(productInfo)
    }
  }

  onSubmit = async () => {
    const newProductInfo = this.formsService.getFormValue()
    //newProductInfo.storeId = Cookies.get('storeID')

    await this.updateProduct(newProductInfo)
      .then((response) => {
        if (response.status === 'error') {
          alert(response.message)
        }
        else if (newProductInfo.barCode !== this.productInfo?.barCode) {
          window.location.href = `/member/product_management/${newProductInfo.barCode}`
        }
        else {
          window.location.reload();
        }
      })
  }

  updateProduct = (newProductInfo: Product): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      this.productService.updateProduct(this.productInfo!.barCode, newProductInfo,)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }

  getProductCategories = (): Promise<ProductCategory[]> => {
    return new Promise((resolve, reject) => {
      this.productCategoryService.getAllProductCategories()
        .subscribe(response => {
          if (response.status == "error") {
            alert(response.message)
          }
          else if (response.productCats) {
            resolve(response.productCats)
          }
          else {
            console.log(response)
          }
        })
    })
  }
}
