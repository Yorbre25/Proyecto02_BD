import { Component, OnInit } from '@angular/core';

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'
import { Manager } from 'src/app/Interfaces/Manager'

//import { ManagerService } from 'src/app/Services/manager.service'

@Component({
  selector: 'app-member-administration',
  templateUrl: './member-administration.component.html',
  styleUrls: ['./member-administration.component.scss']
})
export class MemberAdministrationComponent implements OnInit {
  tableColumns: KeyReplacement<Manager>[]
  tableData: Manager[]

  constructor(
   // private managerService: ManagerService,
  ) { 
    this.tableColumns = [
      { key: "id", replacement: "Cédula" },
      { key: "username", replacement: "Nombre de usuario" },
      { key: "name", replacement: "Nombre completo" },
      { key: "email", replacement: "Correo electrónico" },
    ]

    this.tableData = []
  }

  ngOnInit(): void {

   // this.managerService.getAllManagers()
    //  .subscribe(response => {
     //   if (response.status === 'error') {
      //  }
      //  else if (response.managers) {
      //    this.tableData = response.managers
      //    this.tableData.forEach((manager) => {
       //     manager.name = `${manager.name} ${manager.lastName1} ${manager.lastName2}`
       //   })
       // }
      //  else {
      //    console.log(response)
      //  }
     // })
  }
}
