import { Component, OnInit } from '@angular/core';
//import Cookies from 'js-cookie';

@Component({
  selector: 'app-manager-menu',
  templateUrl: './manager-menu.component.html',
  styleUrls: ['./manager-menu.component.scss']
})
export class ManagerMenuComponent implements OnInit {
  adminUsername: string | null

  constructor() {
    this.adminUsername = ''
  }

  ngOnInit(): void {
    //this.adminUsername = Cookies.get('username')!
  }
}
