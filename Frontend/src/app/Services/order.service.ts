import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { apiURL } from '../app.component'
import { Order } from '../Interfaces/Order';
import { OrdersResponse, ServerResponse } from '../Interfaces/ServerResponses';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url: string = `${apiURL}/order`

  constructor(
    private httpClient: HttpClient,
  ) { }

  /**
 * Solicita al servidor que devuelva todas las ordenes
*/
  getAllOrders = (): Observable<OrdersResponse> =>
    this.httpClient.get<OrdersResponse>(`${this.url}/get_all`)

  getAllOrdersCli = (): Observable<OrdersResponse> =>
    this.httpClient.get<OrdersResponse>(`${this.url}/get_all_cli`)

  setDeliveryMan = (order: Order): Observable<ServerResponse> =>
    this.httpClient.post<ServerResponse>(`${this.url}/set_deliveryman`, order)

  updateOrder = (orderID: number, order: any): Observable<ServerResponse> => {
    order.quantity
      .forEach((quantity: number) => quantity.toString())

    order.productBarCode
      .forEach((productBarCode: number) => productBarCode.toString())

    order.productName
      .forEach((productName: string) => productName.toString())

    return this.httpClient.patch<ServerResponse>(`${this.url}/update/${orderID}`, order)
  }


  addOrder = (order:Order): Observable<ServerResponse> =>
    this.httpClient.post<ServerResponse>(`${this.url}/add`, order)
  
  
}


