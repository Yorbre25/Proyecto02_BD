import { Component, OnInit } from '@angular/core';
import { NavbarLink } from 'src/app/Interfaces/Auxiliaries'
@Component({
  selector: 'app-client-main',
  templateUrl: './client-main.component.html',
  styleUrls: ['./client-main.component.scss']
})
export class ClientMainComponent implements OnInit {
  navbarLinks: NavbarLink[]

  constructor() {
    this.navbarLinks = [
      { href: 'stores', name: 'Restaurantes' },
      { href: 'recent', name: 'Mis Pedidos' },
     // { href: 'cart', name: 'Mi carrito' },
    ]
  }

  ngOnInit(): void {
  }

}
