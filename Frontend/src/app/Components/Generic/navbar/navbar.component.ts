import { Component, Input, OnInit } from '@angular/core'

import { NavbarLink } from 'src/app/Interfaces/Auxiliaries'
import { LoginService } from 'src/app/Services/login-service.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() links: NavbarLink[]

  constructor(
    protected loginService: LoginService
  ) {
    this.links = []
  }

  ngOnInit(): void { }
}
