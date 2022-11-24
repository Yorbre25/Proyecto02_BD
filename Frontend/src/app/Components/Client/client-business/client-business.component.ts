import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';
import { Store } from 'src/app/Interfaces/Store'
import { StoreService } from 'src/app/Services/store.service';

@Component({
  selector: 'app-client-business',
  templateUrl: './client-business.component.html',
  styleUrls: ['./client-business.component.scss']
})
export class ClientBusinessComponent implements OnInit {

  tableColumns: KeyReplacement<Store>[]
  tableData: Store[]
  constructor(private storeService: StoreService) {
    this.tableColumns = [
      { key: "name", replacement: "Nombre del Restaurante" },
    ]
    this.tableData = []
}
ngOnInit(): void {
  this.storeService.getAllStoresData()
    .subscribe(response => {
      if (response.status === 'error') {
        alert(response.message)
      }
      else if (response.storesData) {
        const stores: Store[] = response.storesData
          .map((storeData) => {
            let store: any = storeData.store
            const manager = storeData.manager

            store.managerID = `
              ${manager.name} ${manager.lastName1} ${manager.lastName2}`
            return store
          })

        this.tableData = stores
      }
      else {
        console.log(response)
      }
    })
}
}
