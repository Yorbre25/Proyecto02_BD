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


  getAllOrdersCli = (id: number): Observable<OrdersResponse> =>
    this.httpClient.get<OrdersResponse>(`${this.url}/get_all/${id}`)

  setDeliveryMan = (order: Order): Observable<ServerResponse> =>
    this.httpClient.post<ServerResponse>(`${this.url}/set_deliveryman`, order)
}
