import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';
import { Manager } from 'src/app/Interfaces/Manager';
import { Store, StoreData, StoreManager } from 'src/app/Interfaces/Store';

import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';
import { MessageService } from 'src/app/Services/message.service';
import { StoreService } from 'src/app/Services/store.service';

@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.scss']
})
export class StoreInfoComponent implements OnInit {

  storeInfoTitles: KeyReplacement<Store>[]
  managerInfoTitles: KeyReplacement<StoreManager>[]
  storeData: StoreData
  storeDataCopy: StoreData
  store: Store
  manager: StoreManager


  constructor(
    private route: ActivatedRoute,
    private storeDataService: StoreService,
    protected auxFunctionsService: AuxFunctionsService,
    protected messageService: MessageService
  ) {
    this.storeInfoTitles = [
      { key: 'id', replacement: 'Cédula jurídica' },
      { key: 'name', replacement: 'Nombre del comercio' },
      { key: 'email', replacement: 'Correo electrónico' },
      { key: 'storeTypeName', replacement: 'Tipo de comercio' },
      { key: 'province', replacement: 'Dirección' },
      { key: 'phoneNumbers', replacement: 'Teléfonos' }
    ]

    this.managerInfoTitles = [
      { key: "id", replacement: "Cédula" },
      { key: "username", replacement: "Nombre de usuario" },
      { key: "name", replacement: "Nombre completo" },
      { key: "email", replacement: "Correo electrónico" },
      { key: "province", replacement: "Dirección" },
      { key: "phoneNumbers", replacement: "Teléfonos" },
    ]

    this.storeData = {} as StoreData
    this.storeDataCopy = {} as StoreData
    this.store = {} as Store
    this.manager = {} as StoreManager
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.storeDataService.getStore(id)
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.storeData) {
          this.storeData = response.storeData
          this.storeDataCopy = structuredClone(this.storeData)

          this.store = this.storeData.store
          this.manager = this.storeData.manager

          this.store.province =
            `${this.store.province}, ${this.store.city}, ${this.store.district}`

          this.manager.name =
            `${this.manager.name} ${this.manager.lastName1} ${this.manager.lastName2}`
          this.manager.province =
            `${this.manager.province}, ${this.manager.city}, ${this.manager.district}`
        }
        else {
          console.log(response)
        }
      })
  }

  deleteStoreData = (): void => {
    this.storeDataService.deleteStore(this.storeData.store.id)
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else {
          window.location.href = '/manager/stores'
        }
      })
  }
}
