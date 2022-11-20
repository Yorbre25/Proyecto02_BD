import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ServerResponse } from 'src/app/Interfaces/ServerResponses';
import { Store, StoreData, StoreManager } from 'src/app/Interfaces/Store';
import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';
import { FormsService } from 'src/app/Services/forms.service';
import { MessageService } from 'src/app/Services/message.service';
import { StoreService } from 'src/app/Services/store.service';

@Component({
  selector: 'app-add-store-form',
  templateUrl: './add-store-form.component.html',
  styleUrls: ['./add-store-form.component.scss']
})
export class AddStoreFormComponent implements OnInit, OnChanges {
  store: FormGroup
  manager: FormGroup

  storeInfo?: Store
  managerInfo?: StoreManager

  @Input() storeDataInfo?: StoreData

  constructor(
    private messageService: MessageService,
    private formsService: FormsService,
    private auxFunctionsService: AuxFunctionsService,
    private storeService: StoreService
  ) {
    this.store = new FormGroup({})
    this.manager = new FormGroup({})
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('store', this.store)
    this.formsService.form.addControl('manager', this.manager)
  }

  ngOnChanges(): void {
    if (this.storeDataInfo && Object.keys(this.storeDataInfo).length) {
      this.storeInfo = this.storeDataInfo.store
      this.managerInfo = this.storeDataInfo.manager
    }
  }

  onSubmit = async () => {
    if (this.storeDataInfo && Object.keys(this.storeDataInfo).length) {
      await this.updateStore()
        .then((response: ServerResponse) => {
          if (response.status === 'error') {
            this.messageService.setMessageInfo(response.message!, 'error')
          }
          else if (this.storeDataInfo!.store.id !== this.formsService.form.value.store.id) {
            window.location.href =
              `/manager/stores/${this.formsService.form.value.store.id}`
          }
          else {
            window.location.reload()
          }
        })
    }
    else {
      await this.createStore()
        .then((response) => {
          this.auxFunctionsService.handleResponse(response)
        })
    }
  }

  createStore = (): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      const newStoreInfo = this.formsService.getFormValue()

      this.storeService.createStore(newStoreInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }

  updateStore = (): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      const newStoreInfo = this.formsService.getFormValue()

      this.storeService.updateStore(this.storeDataInfo!.store.id, newStoreInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }
}