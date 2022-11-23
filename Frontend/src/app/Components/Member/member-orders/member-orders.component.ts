import Cookies from 'js-cookie';

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';
import { Order } from 'src/app/Interfaces/Order'
import { OrderService } from 'src/app/Services/order.service';
import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';


@Component({
  selector: 'app-member-orders',
  templateUrl: './member-orders.component.html',
  styleUrls: ['./member-orders.component.scss']
})
export class MemberOrdersComponent implements OnInit {
  @ViewChild('content') modalContent?: any

  preparingTableColumns: KeyReplacement<Order>[]
  otherTableColumns: KeyReplacement<Order>[]

  preparingTableData: Order[]
  onTheWayTableData: Order[]
  deliveredTableData: Order[]

  storeOrders: Order[]

  selectedOrder: Order

  constructor(
    private auxFunctionsService: AuxFunctionsService,
    private modalService: NgbModal,
    private orderService: OrderService
  ) {
    this.preparingTableColumns = [
      { key: "id", replacement: "Código de Orden" },
      { key: "total", replacement: "Total" },
      { key: "province", replacement: "Dirección de Envío" },
      { key: "clientName", replacement: "Cliente" }
    ]

    this.otherTableColumns = [
      { key: "id", replacement: "Código de Orden" },
      { key: "total", replacement: "Total" },
      { key: "province", replacement: "Dirección de Envío" },
      { key: "clientName", replacement: "Cliente" },
      { key: "delManName", replacement: "Repartidor" }
    ]

    this.preparingTableData = []
    this.onTheWayTableData = []
    this.deliveredTableData = []

    this.storeOrders = []

    this.selectedOrder = {} as Order
  }

  ngOnInit(): void {
    this.orderService.getAllOrders()
      .subscribe(response => {
        if (response.status === 'error') {
          alert(response.message)
        }
        else if (response.orders) {
          const storeID = Cookies.get('storeID')
          const storeOrders = response.orders.filter(order => order.storeId === Number(storeID))
          this.storeOrders = structuredClone(storeOrders)

          storeOrders.forEach((order) => {
            order.delManName = `${order.delManName} ${order.delManLastName}`
            order.clientName = `${order.clientName} ${order.clientLastName}`
            order.province = `${order.province}, ${order.city}, ${order.district}`
          })

          this.preparingTableData = storeOrders.filter(order => order.status === 'Preparando')
          this.onTheWayTableData = storeOrders.filter(order => order.status === 'En camino')
          this.deliveredTableData = storeOrders.filter(order => order.status === 'Entregado')
        }
        else {
          console.log(response)
        }
      })
  }

  onOrderClicked = (orderID: number) => {
    this.selectedOrder = this.storeOrders.find(order => order.id === orderID)!
    this.openModal(this.modalContent)
  }

  assignDeliveryMan = () => {
    this.orderService.setDeliveryMan(this.selectedOrder)
      .subscribe(response => {
        if (response.status === 'error') { alert(response.message) }
        else { this.auxFunctionsService.handleResponse(response) }
      })
  }

  openModal = (content: any) => {
    this.modalService.open(content, { size: 'lg', scrollable: true })
  }

  closeModal = () => { this.modalService.dismissAll() }
}