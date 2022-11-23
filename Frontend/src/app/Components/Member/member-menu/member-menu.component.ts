//import Cookies from 'js-cookie';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-menu',
  templateUrl: './member-menu.component.html',
  styleUrls: ['./member-menu.component.scss']
})
export class MemberMenuComponent implements OnInit {
  managerUsername: string | null

  constructor() {
    this.managerUsername = ''
  }

  ngOnInit(): void {
   // this.managerUsername = Cookies.get('username')!
  }

}
