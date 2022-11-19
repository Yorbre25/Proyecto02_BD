import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ServerResponse } from 'src/app/Interfaces/ServerResponses';
import { StoreType } from 'src/app/Interfaces/StoreType';

import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';
import { FormsService } from 'src/app/Services/forms.service';
import { MessageService } from 'src/app/Services/message.service';
import { StoreTypeService } from 'src/app/Services/store-type.service';

@Component({
  selector: 'app-add-store-type-form',
  templateUrl: './add-store-type-form.component.html',
  styleUrls: ['./add-store-type-form.component.scss']
})
export class AddStoreTypeFormComponent implements OnInit {
  name: FormControl

  @Input() storeTypeInfo?: StoreType

  constructor(
    private messageService: MessageService,
    private auxFunctionsService: AuxFunctionsService,
    private storeTypeService: StoreTypeService,
    protected formsService: FormsService
  ) {
    this.name = new FormControl('', [Validators.required])
  }

  ngOnInit(): void {
    this.formsService.resetForm()
    this.formsService.form.addControl('name', this.name)
  }

  ngOnChanges(): void {
    if (this.storeTypeInfo && Object.keys(this.storeTypeInfo).length) {
      const { ...storeTypeInfo } = this.storeTypeInfo as any
      this.formsService.form.patchValue(storeTypeInfo)
    }
  }

  onSubmit = async () => {
    if (this.storeTypeInfo && Object.keys(this.storeTypeInfo).length) {
      await this.updateStoreType()
        .then((response: ServerResponse) => {
          if (response.status === 'error') {
            this.messageService.setMessageInfo(response.message!, 'error')
          }
          else if (this.storeTypeInfo!.id !== this.formsService.form.value.id) {
            window.location.href =
              `/manager/store_types/${this.formsService.form.value.id}`
          }
          else {
            window.location.reload()
          }
        })
    }
    else {
      await this.createStoreType()
        .then((response) => {
          this.auxFunctionsService.handleResponse(response)
        })
    }
  }

  createStoreType = (): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      const newStoreTypeInfo = this.formsService.getFormValue()

      this.storeTypeService.createStoreType(newStoreTypeInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }

  updateStoreType = (): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      const newStoreTypeInfo = this.formsService.getFormValue()
      newStoreTypeInfo.id = this.storeTypeInfo!.id

      this.storeTypeService.updateStoreType(this.storeTypeInfo!.id, newStoreTypeInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }
}