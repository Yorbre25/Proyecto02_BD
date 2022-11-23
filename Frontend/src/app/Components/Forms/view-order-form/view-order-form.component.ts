import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { Order } from 'src/app/Interfaces/Order';

@Component({
  selector: 'app-view-order-form',
  templateUrl: './view-order-form.component.html',
  styleUrls: ['./view-order-form.component.scss']
})
export class ViewOrderFormComponent implements OnInit, OnChanges {

  @Input() orderInfo?: Order

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
  }

}
