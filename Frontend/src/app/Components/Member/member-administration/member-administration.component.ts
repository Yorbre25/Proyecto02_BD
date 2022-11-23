import { Component, OnInit } from '@angular/core';
//import Cookies from 'js-cookie';

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'
import { StoreManager } from 'src/app/Interfaces/Store'
import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';
import { StoreService } from 'src/app/Services/store.service';

@Component({
  selector: 'app-member-administration',
  templateUrl: './member-administration.component.html',
  styleUrls: ['./member-administration.component.scss']
})
export class MemberAdministrationComponent implements OnInit {
  managerInfoTitles: KeyReplacement<StoreManager>[]
  manager: StoreManager
  managerCopy: StoreManager

  constructor(
    private storeService: StoreService,
    protected auxFunctionsService: AuxFunctionsService
  ) {
    this.managerInfoTitles = [
      { key: "id", replacement: "Cédula" },
      { key: "username", replacement: "Nombre de usuario" },
      { key: "name", replacement: "Nombre completo" },
      { key: "email", replacement: "Correo electrónico" },
      { key: "province", replacement: "Dirección" },
      { key: "phoneNumbers", replacement: "Teléfonos" }
    ]

    this.manager = {} as StoreManager
    this.managerCopy = {} as StoreManager
  }

  ngOnInit(): void {
   // const id = Number(Cookies.get('storeID'))
   // this.storeService.getStore(id)
    //  .subscribe((response: any) => {
    //    if (response.status === 'error') {
    //      alert(response.message)
    //    }
    //    else if (response.storeData.manager) {
    //      this.manager = response.storeData.manager
    //     this.managerCopy = structuredClone(this.manager)
//
   //       this.manager.name =
   //         `${this.manager.name} ${this.manager.lastName1} ${this.manager.lastName2}`

    //      this.manager.province =
     //       `${this.manager.province}, ${this.manager.city}, ${this.manager.district}`
     //   }
    //    else {
     //     console.log(response)
    //    }
   //   })
  }
}
