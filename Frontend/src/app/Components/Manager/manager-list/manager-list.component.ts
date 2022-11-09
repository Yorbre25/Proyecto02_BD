import { Component, OnInit } from '@angular/core'

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'
import { Manager } from 'src/app/Interfaces/Manager'

import { ManagerService } from 'src/app/Services/manager.service'
import { MessageService } from 'src/app/Services/message.service'

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.scss']
})
export class ManagerListComponent implements OnInit {
  tableColumns: KeyReplacement<Manager>[]
  tableData: Manager[]

  constructor(
    private managerService: ManagerService,
    protected messageService: MessageService
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
    this.messageService.resetMessageInfo()

    this.managerService.getAllManagers()
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.managers) {
          this.tableData = response.managers
          this.tableData.forEach((manager) => {
            manager.name = `${manager.name} ${manager.lastName1} ${manager.lastName2}`
          })
        }
        else {
          console.log(response)
        }
      })
  }
}