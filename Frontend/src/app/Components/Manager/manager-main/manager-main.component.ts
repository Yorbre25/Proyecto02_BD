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
      { href: 'clients', name: 'Clientes' },
      { href: 'delivery_men', name: 'Repartidores' },
      { href: 'stores', name: 'Comercios' },
      { href: 'reports', name: 'Reportes' },
    ]
  }

  ngOnInit(): void { }
}
