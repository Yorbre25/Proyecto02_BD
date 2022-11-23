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
      { href: 'administration', name: 'Administración' },
      { href: 'product_management', name: 'Productos' },
      { href: 'orders', name: 'Pedidos' }
    ]
  }

  ngOnInit(): void {
  }

}
