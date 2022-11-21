import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ServerResponse } from 'src/app/Interfaces/ServerResponses';
import { Store, StoreData, StoreManager } from 'src/app/Interfaces/Store';
import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';
import { FormsService } from 'src/app/Services/forms.service';
import { StoreService } from 'src/app/Services/store.service';

@Component({
  selector: 'app-add-store-form',
  templateUrl: './add-store-form.component.html',
  styleUrls: ['./add-store-form.component.scss']
})
export class AddStoreFormComponent implements OnInit, OnChanges {
  store: FormGroup
  manager: FormGroup

  form: FormGroup
  storeInfo?: Store
  managerInfo?: StoreManager

  @Input() storeDataInfo?: StoreData

  constructor(
    private formsService: FormsService,
    private auxFunctionsService: AuxFunctionsService,
    private storeService: StoreService
  ) {
    this.form = new FormGroup({})
    this.store = new FormGroup({})
    this.manager = new FormGroup({})
  }

  ngOnInit(): void {
    this.form.addControl('store', this.store)
    this.form.addControl('manager', this.manager)
  }

  ngOnChanges(): void {
    if (this.storeDataInfo && Object.keys(this.storeDataInfo).length) {
      this.storeInfo = this.storeDataInfo.store
      this.managerInfo = this.storeDataInfo.manager
    }
  }

  onSubmit = async () => {
    console.log(this.form.value);

    if (this.storeDataInfo && Object.keys(this.storeDataInfo).length) {
      await this.updateStore()
        .then((response: ServerResponse) => {
          if (response.status === 'error') { alert(response.message) }
          else { window.location.href = '/manager/stores' }
        })
    }
    else {
      await this.createStore()
        .then((response) => {
          this.auxFunctionsService.handleResponse(
            response, () => window.location.href = '/manager/stores')
        })
    }
  }

  createStore = (): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      const newStoreInfo = this.form.value

      this.storeService.createStore(newStoreInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }

  updateStore = (): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      const newStoreInfo = this.form.value

      this.storeService.updateStore(this.storeDataInfo!.store.id, newStoreInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }
}