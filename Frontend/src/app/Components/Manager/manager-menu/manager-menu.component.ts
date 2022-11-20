import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-menu',
  templateUrl: './manager-menu.component.html',
  styleUrls: ['./manager-menu.component.scss']
})
export class ManagerMenuComponent implements OnInit {
  adminUsername: string | null

  constructor(
    private cookieService: CookieService
  ) {
    this.adminUsername = ''
  }

  ngOnInit(): void {
    this.adminUsername = this.cookieService.get('username')
  }
}
