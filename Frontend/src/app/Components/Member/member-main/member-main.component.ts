import { Component, OnInit } from '@angular/core';
import { NavbarLink } from 'src/app/Interfaces/Auxiliaries'

@Component({
  selector: 'app-member-main',
  templateUrl: './member-main.component.html',
  styleUrls: ['./member-main.component.scss']
})
export class MemberMainComponent implements OnInit {
  navbarLinks: NavbarLink[]

  constructor() {
    this.navbarLinks = [
      { href: 'employees', name: 'Empleados' },
      { href: 'members', name: 'Afiliados' },
      { href: 'clients', name: 'Clientes' },
      { href: 'delivery', name: 'Repartidores' },
      { href: 'stores', name: 'Comercios' },
      { href: 'reports', name: 'Reportes' },
    ]
  }

  ngOnInit(): void {
  }

}
