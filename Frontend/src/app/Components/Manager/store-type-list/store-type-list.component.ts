import { Component, OnInit } from '@angular/core';

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';
import { StoreType } from 'src/app/Interfaces/StoreType';

import { MessageService } from 'src/app/Services/message.service';
import { StoreTypeService } from 'src/app/Services/store-type.service';

@Component({
  selector: 'app-store-type-list',
  templateUrl: './store-type-list.component.html',
  styleUrls: ['./store-type-list.component.scss']
})
export class StoreTypeListComponent implements OnInit {
  tableColumns: KeyReplacement<StoreType>[]
  tableData: StoreType[]

  constructor(
    private storeTypeService: StoreTypeService,
    protected messageService: MessageService
  ) {
    this.tableColumns = [
      { key: "id", replacement: "Identificación" },
      { key: "name", replacement: "Tipo de comercio" }
    ]

    this.tableData = []
  }

  ngOnInit(): void {
    this.messageService.resetMessageInfo()

    this.storeTypeService.getAllStoreTypes()
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.storeTypes) {
          this.tableData = response.storeTypes
        }
        else {
          console.log(response)
        }
      })
  }
}
