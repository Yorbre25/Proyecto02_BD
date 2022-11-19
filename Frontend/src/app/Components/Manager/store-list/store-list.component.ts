import { Component, OnInit } from '@angular/core';

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';
import { Store } from 'src/app/Interfaces/Store';

import { MessageService } from 'src/app/Services/message.service';
import { StoreService } from 'src/app/Services/store.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {
  tableColumns: KeyReplacement<Store>[]
  tableData: Store[]

  constructor(
    private storeService: StoreService,
    protected messageService: MessageService
  ) {
    this.tableColumns = [
      { key: "name", replacement: "Nombre del comercio" },
      { key: "email", replacement: "Correo electrónico" },
      { key: "storeTypeName", replacement: "Tipo de comercio" },
    ]

    this.tableData = []
  }

  ngOnInit(): void {
    this.messageService.resetMessageInfo()

    this.storeService.getAllStoresData()
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.storesData) {
          const stores: Store[] = response.storesData
            .map((storeData) => storeData.store)

          this.tableData = stores
        }
        else {
          console.log(response)
        }
      })
  }
}
