import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'
import { Manager } from 'src/app/Interfaces/Manager'

import { AuxFunctionsService } from 'src/app/Services/aux-functions.service'
import { ManagerService } from 'src/app/Services/manager.service'

@Component({
  selector: 'app-manager-info',
  templateUrl: './manager-info.component.html',
  styleUrls: ['./manager-info.component.scss']
})
export class ManagerInfoComponent implements OnInit {
  managerInfoTitles: KeyReplacement<Manager>[]
  manager: Manager
  managerCopy: Manager

  constructor(
    private route: ActivatedRoute,
    private managerService: ManagerService,
    protected auxFunctionsService: AuxFunctionsService
  ) {
    this.managerInfoTitles = [
      { key: "id", replacement: "Cédula" },
      { key: "username", replacement: "Nombre de usuario" },
      { key: "name", replacement: "Nombre completo" },
      { key: "email", replacement: "Correo electrónico" },
      { key: "province", replacement: "Dirección" },
      { key: "phoneNumbers", replacement: "Teléfonos" },
    ]

    this.manager = {} as Manager
    this.managerCopy = {} as Manager
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.managerService.getManager(id)
      .subscribe(response => {
        if (response.status === 'error') {
          alert(response.message)
        }
        else if (response.manager) {
          this.manager = response.manager
          this.managerCopy = structuredClone(this.manager)

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

  deleteManager = (): void => {
    this.managerService.deleteManager(this.manager.id)
      .subscribe(response => {
        if (response.status === 'error') {
          alert(response.message)
        }
        else {
          window.location.href = '/manager/employees'
        }
      })
  }
}
