import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { Order } from 'src/app/Interfaces/Order';

@Component({
  selector: 'app-client-view-order-form',
  templateUrl: './client-view-order-form.component.html',
  styleUrls: ['./client-view-order-form.component.scss']
})
export class ClientViewOrderFormComponent implements OnInit {

  @Input() orderInfo?: Order
  constructor() { }

  ngOnInit(): void {
  }

}
