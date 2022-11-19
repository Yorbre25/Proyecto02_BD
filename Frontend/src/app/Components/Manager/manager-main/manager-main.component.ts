import { Component, OnInit } from '@angular/core'

import { NavbarLink } from 'src/app/Interfaces/Auxiliaries'

@Component({
  selector: 'app-manager-main',
  templateUrl: './manager-main.component.html',
  styleUrls: ['./manager-main.component.scss']
})
export class ManagerMainComponent implements OnInit {
  navbarLinks: NavbarLink[]

  constructor() {
    this.navbarLinks = [
      { href: 'employees', name: 'Empleados' },
      { href: 'members', name: 'Afiliados' },
      { href: 'delivery_men', name: 'Repartidores' },
      { href: 'store_types', name: 'Tipos de comercio' },
      { href: 'reports', name: 'Reportes' },
    ]
  }

  ngOnInit(): void { }
}
