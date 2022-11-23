import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/Interfaces/Product';
import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';
import { FormsService } from 'src/app/Services/forms.service';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss']
})
export class AddProductFormComponent implements OnInit {
  barCode: FormControl
  price: FormControl
  name: FormControl
  categoryId: FormControl
  photo: FormControl
  storeId: FormControl
  photoPath: FormControl

  handleUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.photoPath = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  constructor(
    private auxFunctionsService: AuxFunctionsService,
    protected formsService: FormsService
  ) {
    this.barCode = new FormControl('', [Validators.required])
    this.price = new FormControl('', [Validators.required])
    this.name = new FormControl('', [Validators.required])
    this.categoryId = new FormControl('', [Validators.required])
    this.photo = new FormControl('', [Validators.required])
    this.storeId = new FormControl('', [Validators.required])
    this.photoPath = new FormControl('', [Validators.required])

  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('barCode', this.barCode)
    this.formsService.form.addControl('price', this.price)
    this.formsService.form.addControl('name', this.name)
    this.formsService.form.addControl('categoryId', this.categoryId)
    this.formsService.form.addControl('photo', this.photo)
    this.formsService.form.addControl('storeId', this.storeId)
    this.formsService.form.addControl('photoPath', this.storeId)
  }
}

